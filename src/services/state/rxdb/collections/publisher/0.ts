import {
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
} from "rxdb";

export const publisherSchemaLiteral = {
  version: 0,
  primaryKey: "publisher_id",
  type: "object",
  properties: {
    publisher_id: {
      type: "string",
      maxLength: 100, // <- the primary key must have maxLength
    },
    confidential_id: {
      type: "string",
    },
    phone: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          number: { type: "string" },
          label: { type: "string" },
          created_by: { type: "string" },
          updated_by: { type: "string" },
          created_at: { type: "number" },
          updated_at: { type: "number" },
        },
        required: [
          "id",
          "number",
          "label",
          "created_by",
          "updated_by",
          "created_at",
          "updated_at",
        ],
      },
    },
    address: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          created_by: { type: "string" },
          updated_by: { type: "string" },
          created_at: { type: "number" },
          updated_at: { type: "number" },
          unit_number: { type: "string" },
          house_number: { type: "string" },
          street: { type: "string" },
          suburb: { type: "string" },
          coordinates: {
            type: "array",
            minItems: 2,
            maxItems: 3,
            items: { type: "number" },
          },
        },
        required: [
          "id",
          "label",
          "created_by",
          "updated_by",
          "created_at",
          "updated_at",
        ],
      },
    },
    email: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          address: { type: "string" },
          label: { type: "string" },
          created_by: { type: "string" },
          updated_by: { type: "string" },
          created_at: { type: "number" },
          updated_at: { type: "number" },
        },
        required: [
          "id",
          "address",
          "label",
          "created_by",
          "updated_by",
          "created_at",
          "updated_at",
        ],
      },
    },
    emergency_contact: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          first_name: { type: "string" },
          last_name: { type: "string" },
          relationship: { type: "string" },
          created_by: { type: "string" },
          updated_by: { type: "string" },
          created_at: { type: "number" },
          updated_at: { type: "number" },
          email: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                address: { type: "string" },
                label: { type: "string" },
              },
            },
          },
          phone: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                number: { type: "string" },
                label: { type: "string" },
                created_by: { type: "string" },
                updated_by: { type: "string" },
                created_at: { type: "number" },
                updated_at: { type: "number" },
              },
              required: [
                "id",
                "label",
                "created_by",
                "updated_by",
                "created_at",
                "updated_at",
              ],
            },
          },
        },
        required: [
          "id",
          "first_name",
          "last_name",
          "relationship",
          "phone",
          "created_by",
          "updated_by",
          "created_at",
          "updated_at",
        ],
      },
    },
    photo: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          data: { type: "string", maxLength: 204800 },
          mime_type: { type: "string" },
          created_by: { type: "string" },
          updated_by: { type: "string" },
          created_at: { type: "number" },
          updated_at: { type: "number" },
        },
        required: [
          "id",
          "label",
          "data",
          "mime_type",
          "created_by",
          "updated_by",
          "created_at",
          "updated_at",
        ],
      },
    },
    birth_date: { type: "string" },
    baptism_date: { type: "string" },
    created_by: { type: "string" },
    updated_by: { type: "string" },
    created_at: { type: "number" },
    updated_at: { type: "number" },
  },
  required: [
    "confidential_id",
    "publisher_id",
    "created_by",
    "updated_by",
    "created_at",
    "updated_at",
  ],
} as const;

export const schemaTyped = toTypedRxJsonSchema(publisherSchemaLiteral);

export type PublisherLocal = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;
