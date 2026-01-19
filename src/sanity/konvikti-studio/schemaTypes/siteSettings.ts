import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Sivuston asetukset",
  type: "document",
  fields: [
    defineField({
      name: "introVideo",
      title: "Esittelyvideo",
      type: "object",
      fields: [
        {
          name: "youtubeUrl",
          title: "YouTube-linkki tai video ID",
          type: "string",
          description: "Esim. https://www.youtube.com/watch?v=XXXXXXXXXXX tai pelkkä video ID",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "title_fi",
          title: "Videon otsikko (Suomi)",
          type: "string",
          initialValue: "Tervetuloa Konviktiin",
        },
        {
          name: "title_en",
          title: "Videon otsikko (English)",
          type: "string",
          initialValue: "Welcome to Konvikti",
        },
      ],
    }),
    defineField({
      name: "socialMedia",
      title: "Sosiaalinen media",
      type: "object",
      fields: [
        {
          name: "facebookUrl",
          title: "Facebook-sivu",
          type: "url",
        },
        {
          name: "instagramUrl",
          title: "Instagram-tili",
          type: "url",
        },
        {
          name: "instagramHandle",
          title: "Instagram-käyttäjänimi",
          type: "string",
          description: "Esim. @konvikti",
        },
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Yhteyssähköposti",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Sivuston asetukset",
        subtitle: "Videot, some-linkit ja yhteystiedot",
      };
    },
  },
});