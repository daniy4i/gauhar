import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  phone?: string;
  email?: string;
  city?: string;
  projectType?: string;
  area?: string;
  budget?: string;
  message?: string;
  language?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    
    console.log("Received contact form submission:", formData.name);

    // Validate required fields
    if (!formData.name || formData.name.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Name is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if ((!formData.phone || formData.phone.trim().length === 0) && 
        (!formData.email || formData.email.trim().length === 0)) {
      return new Response(
        JSON.stringify({ error: "Phone or email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format if provided
    if (formData.email && formData.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return new Response(
          JSON.stringify({ error: "Invalid email format" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save to database
    const { error: dbError } = await supabase.from("inquiries").insert({
      name: formData.name.trim().substring(0, 100),
      phone: formData.phone?.trim().substring(0, 50) || null,
      email: formData.email?.trim().toLowerCase().substring(0, 255) || null,
      city: formData.city?.trim().substring(0, 100) || null,
      project_type: formData.projectType?.trim().substring(0, 100) || null,
      area: formData.area?.trim().substring(0, 50) || null,
      budget: formData.budget?.trim().substring(0, 100) || null,
      message: formData.message?.trim().substring(0, 2000) || null,
      language: formData.language || 'ru',
    });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save inquiry" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Inquiry saved to database");

    // Send email notification
    const isRussian = formData.language === 'ru';
    
    const emailHtml = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px;">
        <h1 style="font-size: 24px; font-weight: 300; border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
          ${isRussian ? 'Новая заявка с сайта' : 'New Website Inquiry'}
        </h1>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; width: 140px;">
              ${isRussian ? 'Имя' : 'Name'}
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #222;">
              ${formData.name}
            </td>
          </tr>
          ${formData.phone ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888;">
              ${isRussian ? 'Телефон' : 'Phone'}
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #222;">
              <a href="tel:${formData.phone}" style="color: #c9a227;">${formData.phone}</a>
            </td>
          </tr>
          ` : ''}
          ${formData.email ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888;">
              Email
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #222;">
              <a href="mailto:${formData.email}" style="color: #c9a227;">${formData.email}</a>
            </td>
          </tr>
          ` : ''}
          ${formData.city ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888;">
              ${isRussian ? 'Город' : 'City'}
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #222;">
              ${formData.city}
            </td>
          </tr>
          ` : ''}
          ${formData.projectType ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888;">
              ${isRussian ? 'Тип проекта' : 'Project Type'}
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #222;">
              ${formData.projectType}
            </td>
          </tr>
          ` : ''}
          ${formData.area ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888;">
              ${isRussian ? 'Площадь' : 'Area'}
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #222;">
              ${formData.area} м²
            </td>
          </tr>
          ` : ''}
          ${formData.budget ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888;">
              ${isRussian ? 'Бюджет' : 'Budget'}
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #222;">
              ${formData.budget}
            </td>
          </tr>
          ` : ''}
        </table>
        
        ${formData.message ? `
        <div style="margin-top: 30px;">
          <h3 style="font-size: 14px; font-weight: 400; color: #888; margin-bottom: 12px;">
            ${isRussian ? 'Сообщение' : 'Message'}
          </h3>
          <p style="background: #111; padding: 20px; border-left: 3px solid #c9a227; margin: 0; line-height: 1.6;">
            ${formData.message.replace(/\n/g, '<br>')}
          </p>
        </div>
        ` : ''}
        
        <p style="margin-top: 40px; color: #666; font-size: 12px;">
          ${isRussian ? 'Отправлено с сайта gauharsergazina.kz' : 'Sent from gauharsergazina.kz'}
        </p>
      </div>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Gauhar Sergazina <onboarding@resend.dev>",
        to: ["gauhars@mail.ru"],
        subject: isRussian 
          ? `Новая заявка от ${formData.name}` 
          : `New inquiry from ${formData.name}`,
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();
    const emailError = !emailResponse.ok ? emailResult : null;

    if (emailError) {
      console.error("Email sending error:", emailError);
      // Still return success since the inquiry was saved
      return new Response(
        JSON.stringify({ success: true, emailSent: false }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Email notification sent successfully");

    return new Response(
      JSON.stringify({ success: true, emailSent: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
