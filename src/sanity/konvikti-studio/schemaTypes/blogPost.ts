import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blogipostaus",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Otsikko",
      type: "string",
      validation: (Rule) => Rule.required().error("Otsikko on pakollinen"),
    }),
    defineField({
      name: "slug",
      title: "URL-tunniste",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("URL-tunniste on pakollinen"),
    }),
    defineField({
      name: "author",
      title: "Kirjoittaja",
      type: "string",
      validation: (Rule) => Rule.required().error("Kirjoittaja on pakollinen"),
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "string",
      options: {
        list: [
          { title: "Blogi", value: "blog" },
          { title: "Uutiset", value: "news" },
          { title: "Tiedote", value: "announcement" },
          { title: "Tapahtuma", value: "event" },
        ],
        layout: "radio",
      },
      initialValue: "blog",
    }),
    defineField({
      name: "coverImage",
      title: "Kansikuva",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "excerpt",
      title: "Lyhyt kuvaus",
      type: "text",
      rows: 3,
      description: "Lyhyt kuvaus joka näkyy listauksessa",
    }),
    defineField({
      name: "content",
      title: "Sisältö",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normaali", value: "normal" },
            { title: "Otsikko 2", value: "h2" },
            { title: "Otsikko 3", value: "h3" },
            { title: "Lainaus", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Lihavoitu", value: "strong" },
              { title: "Kursivoitu", value: "em" },
              { title: "Alleviivattu", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Linkki",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Kuvateksti",
            },
            {
              name: "alt",
              type: "string",
              title: "Alt-teksti",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tagit",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Julkaisupäivä",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "coverImage",
      category: "category",
    },
    prepare(selection) {
      const { title, author, media, category } = selection;
      const categoryLabels: Record<string, string> = {
        blog: "Blogi",
        news: "Uutiset",
        announcement: "Tiedote",
        event: "Tapahtuma",
      };
      return {
        title,
        subtitle: `${categoryLabels[category] || category} — ${author}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Julkaisupäivä, uusin ensin",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
