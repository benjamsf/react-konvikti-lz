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
      name: "title",
      title: "Titteli",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Kuvaus",
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
      subtitle: "title",
      media: "image",
    },
  },
});
