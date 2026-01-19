import { defineField, defineType } from "sanity";

export const staffMember = defineType({
  name: "staffMember",
  title: "Henkilökunta",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nimi",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_fi",
      title: "Titteli (Suomi)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_en",
      title: "Titteli (English)",
      type: "string",
    }),
    defineField({
      name: "description_fi",
      title: "Kuvaus (Suomi)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description_en",
      title: "Kuvaus (English)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Kuva",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "order",
      title: "Järjestys",
      type: "number",
      description: "Pienempi numero näytetään ensin",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Aktiivinen",
      type: "boolean",
      description: "Näytetäänkö henkilö sivustolla",
      initialValue: true,
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
      subtitle: "title_fi",
      media: "image",
    },
  },
});
