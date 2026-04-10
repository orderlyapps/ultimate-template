import { IonButton } from "@ionic/react";
import { PDFDownloadLink, type DocumentProps } from "@react-pdf/renderer";
import type React from "react";

/**
 * Props for the PdfDownloadButton component
 */
type PdfDownloadButtonProps = React.ComponentProps<typeof IonButton> & {
  /** The PDF document component to render and download */
  document: React.ReactElement<DocumentProps>;
  /** The filename for the downloaded PDF (without .pdf extension) */
  filename: string;
};

/**
 * A reusable button component that generates and downloads a PDF using @react-pdf/renderer's PDFDownloadLink.
 * Uses Ionic's IonButton for consistent styling with the rest of the app.
 *
 * @example
 * ```tsx
 * <PdfDownloadButton
 *   document={<MyPdfDocument data={data} />}
 *   filename="my-document"
 *   expand="block"
 * >
 *   Download PDF
 * </PdfDownloadButton>
 * ```
 */
export const PdfDownloadButton: React.FC<PdfDownloadButtonProps> = ({
  document,
  filename,
  children,
  ...ionButtonProps
}) => {
  return (
    <PDFDownloadLink document={document} fileName={`${filename}.pdf`} style={{ textDecoration: "none" }}>
      {({ loading }) => (
        <IonButton {...ionButtonProps} disabled={ionButtonProps.disabled || loading}>
          {loading ? "Generating PDF..." : children}
        </IonButton>
      )}
    </PDFDownloadLink>
  );
};
