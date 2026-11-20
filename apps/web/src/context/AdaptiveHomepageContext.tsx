"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useTransition } from "react";
import type {
  AdaptiveProfile,
  HomepageAdaptation,
  ChatMessage,
  VisitorGoal,
  AIGuideResponse,
} from "@/types/adaptive";

interface CounsellingModalData {
  courseId?: string;
  goal?: string;
  prefillReason?: string;
}

interface AdaptiveHomepageContextType {
  profile: AdaptiveProfile | null;
  adaptation: HomepageAdaptation | null;
  messages: ChatMessage[];
  isPersonalized: boolean;
  isThinking: boolean;
  selectedGoal: VisitorGoal | null;
  activeModal: "counselling" | null;
  modalData: CounsellingModalData | null;
  sendMessage: (text: string) => Promise<void>;
  selectQuickGoal: (goal: VisitorGoal) => Promise<void>;
  resetPersonalization: () => void;
  openCounsellingHandoff: (data?: CounsellingModalData) => void;
  closeCounsellingHandoff: () => void;
}

const STORAGE_KEY = "didm_adaptive_profile_v1";

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: "msg-welcome",
  sender: "guide",
  text: "Hello! I am your DIDM Course & Career Guide. Tell me your background or goal (e.g. college student, looking for job switch, business owner), and I will adapt the entire curriculum, projects, and batch options for you.",
  timestamp: new Date().toISOString(),
  suggestions: [
    "🎓 College Student",
    "💼 Career Switcher",
    "🚀 Business Owner",
    "💻 Freelancer / Creator",
    "🔍 Exploring Options",
  ],
};

const AdaptiveHomepageContext = createContext<AdaptiveHomepageContextType | undefined>(undefined);

export function AdaptiveHomepageProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<AdaptiveProfile | null>(null);
  const [adaptation, setAdaptation] = useState<HomepageAdaptation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WELCOME_MESSAGE]);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<VisitorGoal | null>(null);
  const [activeModal, setActiveModal] = useState<"counselling" | null>(null);
  const [modalData, setModalData] = useState<CounsellingModalData | null>(null);
  const [, startTransition] = useTransition();

  // Load saved profile on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.adaptation) setAdaptation(parsed.adaptation);
        if (parsed.profile?.visitorGoal) setSelectedGoal(parsed.profile.visitorGoal);
      }
    } catch {
      // Local storage not accessible
    }
  }, []);

  // Save profile updates
  const persistState = useCallback((newProfile: AdaptiveProfile | null, newAdaptation: HomepageAdaptation | null) => {
    try {
      if (newProfile && newAdaptation) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile: newProfile, adaptation: newAdaptation }));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
  }, []);

  const resetPersonalization = useCallback(() => {
    startTransition(() => {
      setProfile(null);
      setAdaptation(null);
      setSelectedGoal(null);
      setMessages([DEFAULT_WELCOME_MESSAGE]);
      persistState(null, null);
    });
  }, [persistState]);

  const openCounsellingHandoff = useCallback((data?: CounsellingModalData) => {
    setModalData(data || null);
    setActiveModal("counselling");
  }, []);

  const closeCounsellingHandoff = useCallback(() => {
    setActiveModal(null);
    setModalData(null);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isThinking) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: "user",
        text: trimmed,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsThinking(true);

      try {
        const history = messages.slice(-8).map((m) => ({
          role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
          content: m.text,
        }));

        const res = await fetch("/api/ai-guide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history,
            currentProfile: profile || undefined,
          }),
        });

        if (!res.ok) {
          throw new Error("Guide response failed");
        }

        const data: AIGuideResponse = await res.json();

        const guideMsg: ChatMessage = {
          id: `guide-${Date.now()}`,
          sender: "guide",
          text: data.reply,
          timestamp: new Date().toISOString(),
          suggestions: data.suggestedFollowUps,
          counsellingSuggested: data.counsellingSuggested,
        };

        const updatedProfile: AdaptiveProfile = {
          visitorGoal: (data.profileUpdates.visitorGoal || profile?.visitorGoal || "explorer") as VisitorGoal,
          experienceLevel: data.profileUpdates.experienceLevel || profile?.experienceLevel || "beginner",
          skillInterests: data.profileUpdates.skillInterests || profile?.skillInterests || [],
          preferredLearningMode: data.profileUpdates.preferredLearningMode || profile?.preferredLearningMode || "either",
          preferredLocation: data.profileUpdates.preferredLocation || profile?.preferredLocation,
          schedulePreference: data.profileUpdates.schedulePreference || profile?.schedulePreference,
          recommendedCourseIds: data.profileUpdates.recommendedCourseIds || profile?.recommendedCourseIds || ["midm"],
          confidenceLevel: data.profileUpdates.confidenceLevel || profile?.confidenceLevel || 0.8,
          lastUpdatedAt: new Date().toISOString(),
        };

        startTransition(() => {
          setMessages((prev) => [...prev, guideMsg]);
          setProfile(updatedProfile);
          setAdaptation(data.homepageUpdates);
          setSelectedGoal(updatedProfile.visitorGoal);
          persistState(updatedProfile, data.homepageUpdates);
        });
      } catch (err) {
        console.error("[AdaptiveHomepageContext] sendMessage error:", err);
        const errorMsg: ChatMessage = {
          id: `guide-err-${Date.now()}`,
          sender: "guide",
          text: "I encountered a brief connection issue. Our admissions advisors are also standing by to guide you via WhatsApp or direct phone.",
          timestamp: new Date().toISOString(),
          suggestions: ["Book Free 1-on-1 Counselling", "View Course Catalog", "Find Nearest Campus"],
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsThinking(false);
      }
    },
    [isThinking, messages, profile, persistState]
  );

  const selectQuickGoal = useCallback(
    async (goal: VisitorGoal) => {
      const goalPrompts: Record<VisitorGoal, string> = {
        student: "I am a college student looking to build practical digital marketing skills and get placed.",
        career_switch: "I want to switch my career into digital marketing and high-growth AI roles.",
        business_owner: "I am a business owner wanting to generate more leads, sales and master local search.",
        freelancer: "I want to become a freelancer and earn client retainers in performance marketing.",
        explorer: "I am exploring digital marketing courses and want to know how DIDM works.",
      };

      await sendMessage(goalPrompts[goal]);
    },
    [sendMessage]
  );

  const isPersonalized = Boolean(profile && adaptation);

  return (
    <AdaptiveHomepageContext.Provider
      value={{
        profile,
        adaptation,
        messages,
        isPersonalized,
        isThinking,
        selectedGoal,
        activeModal,
        modalData,
        sendMessage,
        selectQuickGoal,
        resetPersonalization,
        openCounsellingHandoff,
        closeCounsellingHandoff,
      }}
    >
      {children}
    </AdaptiveHomepageContext.Provider>
  );
}

export function useAdaptiveHomepage() {
  const context = useContext(AdaptiveHomepageContext);
  if (!context) {
    throw new Error("useAdaptiveHomepage must be used within an AdaptiveHomepageProvider");
  }
  return context;
}
