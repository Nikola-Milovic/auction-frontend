<script setup lang="ts">
import router from "@/router";
import type { RootMutationType, Session } from "@/types/types";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { Field, ErrorMessage, useForm } from "vee-validate";
import { useCookies } from "vue3-cookies";
import { object, string } from "yup";
const schema = object({
  email: string().required().email().defined(),
  password: string().required().defined(),
});

const { handleSubmit, errors } = useForm({ validationSchema: schema });

const {cookies} = useCookies();

const onSubmit = handleSubmit((values) => {
  const res = login({
    email: values.email!,
    password: values.password!,
  });
});

const {
  loading,
  error,
  mutate: login,
  onDone,
  onError,
} = useMutation<{ login: Session }, { email: string; password: string }>(gql`
  mutation CreateAuction($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        money
      }
    }
  }
`);

onDone((result) => {
  if(!result.data) return;
  result.data.login.token && cookies.set("auction_auth_token", result.data.login.token)
    console.log("set token ", result.data.login.token);
    router.replace("/")
});

onError((err) => {
  console.log(err);
});
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <form
      @submit="onSubmit"
      class="max-w-md w-full shadow-md rounded-md flex flex-col gap-2 p-6"
    >
      <Field
        class="base-input"
        :class="{ 'base-input__error': errors.email }"
        type="text"
        placeholder="Email"
        name="email"
      />
      <ErrorMessage class="error" name="email" />
      <Field
        placeholder="Password"
        class="base-input"
        :class="{ 'base-input__error': errors.password }"
        type="text"
        name="password"
      />
      <ErrorMessage class="error" name="password" />
      <button class="btn" type="submit">Login</button>
    </form>
  </div>
</template>
