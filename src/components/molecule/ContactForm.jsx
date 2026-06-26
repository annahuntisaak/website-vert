import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import settings from '../../globalSettings';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const fieldStyle = `
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 246, 242, 0.4);
  color: #fff6f2;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.08em;
  padding: 0.5rem 0;
  width: 100%;
  outline: none;

  &::placeholder {
    color: rgba(255, 246, 242, 0.45);
  }

  &:focus {
    border-bottom-color: #fff6f2;
  }
`;

const Input = styled.input`${fieldStyle}`;
const TextArea = styled.textarea`
  ${fieldStyle}
  resize: vertical;
  min-height: 120px;
`;

const Submit = styled.button`
  align-self: center;
  margin-top: 1.5rem;
  background: transparent;
  border: 1px solid rgba(255, 246, 242, 0.5);
  border-radius: 50px;
  color: #fff6f2;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.12em;
  padding: 1rem 2rem;
  cursor: pointer;

  &:hover {
    background: rgba(255, 246, 242, 0.07);
  }
`;

const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    emailjs
      .send(
        settings.EMAIL_JS_SERVICE_ID,
        settings.EMAIL_JS_TEMPLATE_ID,
        data,
        settings.EMAIL_JS_USER_ID
      )
      .then(() => reset());
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('name')} placeholder="name" />
      <Input {...register('email')} placeholder="email" />
      <TextArea {...register('message')} placeholder="message" />
      <Submit type="submit">send</Submit>
    </Form>
  );
};

export default ContactForm;
