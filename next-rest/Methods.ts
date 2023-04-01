// TODO: expand capabilities for head, patch, and others for nice to have ux features

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE'] as const;
export type HttpMethod = (typeof httpMethods)[number];

export const isHttpMethod = (method: string): method is HttpMethod =>
  httpMethods.includes(method as HttpMethod);
