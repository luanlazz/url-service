import { validate } from 'class-validator';

export const validateDto = async (dto: any) => {
  const errors = await validate(dto);
  if (errors.length > 0) {
    console.log('errors', errors);
    throw new Error(errors.toString());
  }
};
