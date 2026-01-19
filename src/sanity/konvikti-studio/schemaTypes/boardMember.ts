import { defineField, defineType } from "sanity";

export const boardMember = defineType({
  name: "boardMember",
  title: "Johtokunnan jäsen",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nimi",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role_fi",
      title: "Rooli (Suomi)",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Esim. Puheenjohtaja, Jäsen, Varajäsen",
    }),
    defineField({
      name: "role_en",
      title: "Rooli (English)",
      type: "string",
      description: "E.g. Chairman, Member, Deputy member",
    }),
    defineField({
      name: "order",
      title: "Järjestys",
      type: "number",
      description: "Pienempi numero näytetään ensin (esim. puheenjohtaja = 1)",
      initialValue: 10,
    }),
    defineField({
      name: "isActive",
      title: "Aktiivinen",
      type: "boolean",
      description: "Näytetäänkö henkilö sivustolla",
      initialValue: true,
    }),
    defineField({
      name: "year",
      title: "Kausi",
      type: "string",
      description: "Esim. 2026 tai 2025-2026",
    }),
  ],
  orderings: [
    {
      title: "Järjestys",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role_fi",
    },
  },
});
