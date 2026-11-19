const UTM_KEYS = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"] as const;
/** Keep campaign context only; never collect arbitrary query-string values. */
export function enquiryAttribution(url: string, fallback = "counselling") {
  const params = new URL(url).searchParams;
  const utmParams: Record<string,string> = {};
  for(const key of UTM_KEYS){const value=params.get(key);if(value)utmParams[key]=value.slice(0,200);}
  const form=params.get("form");
  return {utmParams,formType:form&&/^[a-z0-9_-]{1,60}$/.test(form)?form:fallback};
}
