import * as React from "react";

export interface DataField {
  label: string;
  value: React.ReactNode;
}

interface DynamicEmailTemplateProps {
  title: string;
  subtitle: string;
  tableData: DataField[];
}

export const DynamicEmailTemplate: React.FC<DynamicEmailTemplateProps> = ({
  title,
  subtitle,
  tableData,
}) => {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', backgroundColor: "#F3F4F6", padding: "40px 20px", color: "#1F2937" }}>
      <table align="center" width="100%" cellPadding="0" cellSpacing="0" style={{ maxWidth: "600px", backgroundColor: "#FFFFFF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)", border: "1px solid #E5E7EB" }}>
        
        {/* HEADER SECTION */}
        <thead>
          <tr>
            <td style={{ backgroundColor: "#FFFFFF", padding: "32px 32px 10px 32px", textAlign: "center" }}>
              {/* BRAND LOGO Container */}
              <div style={{ marginBottom: "20px" }}>
               
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#FFFFFF", padding: "0 32px 24px 32px", textAlign: "center" }}>
              <h1 style={{ color: "#111827", margin: "0 0 6px 0", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.025em" }}>
                {title}
              </h1>
              <p style={{ color: "#4B5563", margin: 0, fontSize: "14px", fontWeight: "500" }}>{subtitle}</p>
              {/* Accent Border Line */}
              <div style={{ height: "4px", width: "48px", backgroundColor: "#D10F2F", margin: "16px auto 0 auto", borderRadius: "2px" }}></div>
            </td>
          </tr>
        </thead>

        {/* BODY (DYNAMIC TABLE) */}
        <tbody>
          <tr>
            <td style={{ padding: "0 32px 40px 32px" }}>
              <table width="100%" cellPadding="0" cellSpacing="0" style={{ borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td style={{ 
                        padding: "16px 0", 
                        fontWeight: "600", 
                        color: "#4B5563", 
                        width: "30%", 
                        borderBottom: "1px solid #E5E7EB", 
                        fontSize: "14px", 
                        verticalAlign: "top" 
                      }}>
                        {row.label}
                      </td>
                      <td style={{ 
                        padding: "16px 0 16px 16px", 
                        color: "#111827", 
                        borderBottom: "1px solid #E5E7EB", 
                        fontSize: "14px", 
                        lineBreak: "anywhere",
                        verticalAlign: "top"
                      }}>
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>

        {/* FOOTER */}
        <tfoot>
          <tr>
            <td style={{ backgroundColor: "#FAFAFA", padding: "28px 32px", textAlign: "center", fontSize: "12px", color: "#6B7280", borderTop: "1px solid #E5E7EB" }}>
              <p style={{ margin: "0 0 4px 0", fontWeight: "600", color: "#4B5563", letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "11px" }}>
                Australian Indian Orchestra
              </p>
              <p style={{ margin: "0 0 12px 0" }}>© {new Date().getFullYear()} Internal Registry Administration.</p>
              <p style={{ margin: 0, fontSize: "11px", color: "#9CA3AF" }}>
                This is an automatic notification mail securely transmitted from your web infrastructure.
              </p>
            </td>
          </tr>
        </tfoot>

      </table>
    </div>
  );
};