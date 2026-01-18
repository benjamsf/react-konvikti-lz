import { defineField, defineType } from "sanity";

export const organizationRules = defineType({
  name: "organizationRules",
  title: "Yhdistyksen säännöt",
  type: "document",
  fields: [
    defineField({
      name: "title_fi",
      title: "Otsikko (Suomi)",
      type: "string",
      initialValue: "Yhdistyksen säännöt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_en",
      title: "Otsikko (English)",
      type: "string",
      initialValue: "Association Rules",
    }),
    defineField({
      name: "content_fi",
      title: "Säännöt (Suomi)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          lists: [
            { title: "Numbered", value: "number" },
            { title: "Bullet", value: "bullet" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
      ],
      description: "Yhdistyksen säännöt kokonaisuudessaan",
    }),
    defineField({
      name: "content_en",
      title: "Säännöt (English)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          lists: [
            { title: "Numbered", value: "number" },
            { title: "Bullet", value: "bullet" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
      ],
      description: "Association rules in English (optional)",
    }),
    defineField({
      name: "lastUpdated",
      title: "Viimeksi päivitetty",
      type: "date",
      description: "Milloin säännöt on viimeksi päivitetty",
    }),
    defineField({
      name: "isPublished",
      title: "Julkaistu",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title_fi",
      subtitle: "lastUpdated",
    },
  },
});