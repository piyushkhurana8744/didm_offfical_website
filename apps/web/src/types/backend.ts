import { Course, Centre, RedirectRule } from "./content";

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  courseId: string;
  centreId: string;
  preferredBatch: string;
  consent: boolean;
  sourceUrl?: string;
  utmParams?: Record<string, string>;
  createdAt?: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  enquiryId?: string;
  mode: "local_demo" | "crm_queued" | "direct_assisted";
  counselorContact: {
    phone: string;
    whatsappUrl: string;
  };
}

export interface CourseRepository {
  getAll(): Promise<Course[]>;
  getBySlug(slug: string): Promise<Course | null>;
  search(query: string): Promise<Course[]>;
}

export interface CentreRepository {
  getAll(): Promise<Centre[]>;
  getBySlug(slug: string): Promise<Centre | null>;
  getByRegion(region: string): Promise<Centre[]>;
}

export interface EnquiryService {
  submit(payload: EnquiryPayload): Promise<EnquiryResponse>;
  listRecent?(limit?: number): Promise<EnquiryPayload[]>;
}

export interface RedirectService {
  match(path: string): Promise<RedirectRule | null>;
  getAllRules(): Promise<RedirectRule[]>;
}

