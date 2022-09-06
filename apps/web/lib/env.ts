if (!process.env.NEXT_PUBLIC_BASE_DOMAIN)
	throw new Error("missing environment variable 'NEXT_PUBLIC_BASE_DOMAIN'");
export const NEXT_PUBLIC_BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;
