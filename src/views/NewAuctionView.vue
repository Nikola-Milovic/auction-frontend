<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import MainLayout from "../components/layout/MainLayout.vue";
import { object, string, date } from "yup";
import { Field, ErrorMessage, useForm } from "vee-validate";
import type {
  Item,
  Maybe,
  AuctionItemInput,
  RootMutationType,
  RootQueryType,
} from "@/types/types";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import router from "@/router";

const schema = object({
  title: string().required().min(4),
  description: string().required().min(10),
  endsAt: string().required(),
});

const { handleSubmit, errors } = useForm({ validationSchema: schema });

const onSubmit = handleSubmit((values) => {
  const params = {
    description: values.description!,
    title: values.title!,
    endsAt: new Date(values.endsAt!).toISOString(),
  };

  const res = createItemMutation({
    input: params
  });
});

const {
  loading,
  error,
  mutate: createItemMutation,
  onDone,
  onError,
} = useMutation<{createAuctionItem: Maybe<Item>}, { input: AuctionItemInput }>(gql`
  mutation CreateItem($input: AuctionItemInput!) {
    createAuctionItem(input: $input) {
      id
    }
  }
`);

onDone((result) => {
  router.push("/details/" + result.data?.createAuctionItem?.id);
});

onError((err) => {
  console.log(err);
});
</script>

<template>
  <MainLayout>
    <form
      class="flex flex-col max-w-sm gap-2 items-center p-2"
      @submit="onSubmit"
    >
      <Field
        class="base-input"
        :class="{ 'base-input__error': errors.title }"
        type="text"
        name="title"
      />
      <ErrorMessage class="error" name="title" />
      <Field
        class="base-input"
        :class="{ 'base-input__error': errors.title }"
        name="endsAt"
        type="datetime-local"
      />
      <ErrorMessage class="error" name="endsAt" />
      <Field
        class="base-input"
        :class="{ 'base-input__error': errors.title }"
        name="description"
        type="textarea"
      />
      <ErrorMessage class="error" name="description" />
      <button class="btn" type="submit">Submit</button>
    </form>
  </MainLayout>
</template>
