import { z, type ZodEffects, type ZodLiteral, type ZodUnion } from 'zod';

declare module 'zod' {
	interface ZodString {
		empty(): ZodUnion<[this, ZodEffects<ZodLiteral<''>, undefined>]>;
	}
}

z.ZodString.prototype.empty = function () {
	return this.or(z.literal('').transform(() => undefined));
};

export * from 'zod';
