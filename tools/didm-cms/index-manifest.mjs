export const indexManifest={
 roles:[{key:{name:1},unique:true}],users:[{key:{email:1},unique:true}],sessions:[{key:{tokenHash:1},unique:true},{key:{expiresAt:1},expireAfterSeconds:0},{key:{userId:1}}],
 pages:[{key:{slug:1},unique:true},{key:{status:1}}],pagerevisions:[{key:{pageId:1,revisionNumber:1},unique:true},{key:{pageId:1}}],courses:[{key:{slug:1},unique:true}],centres:[{key:{slug:1},unique:true}],forms:[{key:{slug:1},unique:true}],formversions:[{key:{formId:1,versionNumber:1},unique:true}],
 mediaassets:[{key:{stableKey:1},unique:true},{key:{publicPath:1},unique:true},{key:{sha256:1}}],formsubmissions:[{key:{formId:1,createdAt:-1}}],leads:[{key:{phone:1}},{key:{status:1,createdAt:-1}},{key:{assignedUserId:1,status:1,createdAt:-1}},{key:{leadSource:1,"attribution.ipHash":1,createdAt:-1}}],leadactivities:[{key:{leadId:1}}],auditlogs:[{key:{createdAt:-1}}]
};
export function indexSignature(spec){return JSON.stringify({key:spec.key,unique:Boolean(spec.unique),ttl:spec.expireAfterSeconds??null});}
