import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const transferSchema = z.object({
  amount: z
    .number({
      required_error: 'Specify the amount',
      invalid_type_error: 'Amount must be number',
    })
    .positive({ message: 'Amount must be > 0' })
    .superRefine((amount, ctx) => {
      const amountStr = amount + '';
      if (!(/^\d+$/.test(amountStr) || /^\d+\.\d{1,2}$/.test(amountStr))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid format of amount (${amountStr}). Amount must be decimal number with precision equal 2`,
        });
      }
      return parseFloat(amountStr);
    }),
});

export default class TransferDto extends createZodDto(transferSchema) {
  amount: number;
}
