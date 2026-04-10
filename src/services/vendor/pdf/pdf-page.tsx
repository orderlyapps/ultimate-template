import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type React from "react";

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2pt solid #333",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  content: {
    flex: 1,
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: "1pt solid #ccc",
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
});

/**
 * Props for the PdfPage component
 */
type PdfPageProps = {
  /** Page size - defaults to A4 */
  size?: "A4" | "LETTER" | [number, number];
  /** Page orientation */
  orientation?: "portrait" | "landscape";
  /** Page title displayed in the header */
  title?: string;
  /** Subtitle displayed below the title */
  subtitle?: string;
  /** Footer text displayed at the bottom */
  footer?: string;
  /** Children content */
  children: React.ReactNode;
  /** Custom page styles to override defaults */
  pageStyle?: Record<string, unknown>;
  /** Custom header styles to override defaults */
  headerStyle?: Record<string, unknown>;
};

/**
 * A reusable PDF page component with consistent styling for headers, content, and footers.
 * Wraps @react-pdf/renderer's Page component with common layout patterns.
 *
 * @example
 * ```tsx
 * <Document>
 *   <PdfPage title="My Document" subtitle="Q1 2024" footer="Page 1">
 *     <View>
 *       <Text>Your content here</Text>
 *     </View>
 *   </PdfPage>
 * </Document>
 * ```
 */
export const PdfPage: React.FC<PdfPageProps> = ({
  size = "A4",
  orientation = "portrait",
  title,
  subtitle,
  footer,
  children,
  pageStyle,
  headerStyle,
}) => {
  const pageStyles = pageStyle ? { ...styles.page, ...pageStyle } : styles.page;

  return (
    <Page size={size} orientation={orientation} style={pageStyles}>
      {(title || subtitle) && (
        <View style={headerStyle ? { ...styles.header, ...headerStyle } : styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}

      <View style={styles.content}>{children}</View>

      {footer && (
        <View style={styles.footer}>
          <Text>{footer}</Text>
        </View>
      )}
    </Page>
  );
};
