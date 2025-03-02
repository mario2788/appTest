
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

class EmailService {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error('MailerSend API key is required');
        }

        this.mailerSend = new MailerSend({
            apiKey: apiKey
        });
    }

    /**
     * Crea un nuevo remitente
     * @param {string} email - Dirección de correo del remitente
     * @param {string} name - Nombre del remitente
     * @returns {Sender} Objeto Sender
     */
    createSender(email, name = '') {
        return new Sender(email, name);
    }

    /**
     * Crea un nuevo destinatario
     * @param {string} email - Dirección de correo del destinatario
     * @param {string} name - Nombre del destinatario
     * @returns {Recipient} Objeto Recipient
     */
    createRecipient(email, name = '') {
        return new Recipient(email, name);
    }

    /**
     * Envía un correo electrónico
     * @param {Object} options - Opciones de configuración del correo
     * @param {Sender} options.from - Remitente del correo
     * @param {Recipient[]} options.to - Destinatarios del correo
     * @param {string} options.subject - Asunto del correo
     * @param {string} [options.html] - Contenido HTML del correo
     * @param {string} [options.text] - Contenido de texto plano del correo
     * @param {Sender} [options.replyTo] - Dirección de respuesta
     * @returns {Promise} Promesa que resuelve con el resultado del envío
     */
    async sendEmail({
        from,
        to,
        subject,
        html = '',
        text = '',
        replyTo = null
    }) {
        // Validaciones
        if (!from) {
            throw new Error('Sender is required');
        }
        if (!to || to.length === 0) {
            throw new Error('At least one recipient is required');
        }
        if (!subject) {
            throw new Error('Subject is required');
        }

        // Crear parámetros de correo
        const emailParams = new EmailParams()
            .setFrom(from)
            .setTo(to)
            .setSubject(subject);

        // Agregar contenido HTML si está presente
        if (html) {
            emailParams.setHtml(html);
        }

        // Agregar contenido de texto plano si está presente
        if (text) {
            emailParams.setText(text);
        }

        // Agregar dirección de respuesta si está presente
        if (replyTo) {
            emailParams.setReplyTo(replyTo);
        }

        try {
            // Enviar correo
            const response = await this.mailerSend.email.send(emailParams);
            return response;
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    /**
     * Método para enviar correos de alerta
     * @param {Object} alertOptions - Opciones de la alerta
     * @param {string} alertOptions.subject - Asunto de la alerta
     * @param {string} alertOptions.message - Mensaje de la alerta
     * @param {string[]} alertOptions.recipients - Lista de correos de destinatarios
     * @param {Object} [alertOptions.additionalDetails] - Detalles adicionales para incluir en el correo
     */
    async sendAlertEmail({
        subject,
        message,
        recipients,
        additionalDetails = {}
    }) {
        // Crear remitente
        const from = this.createSender(
            process.env.MAILERSEND_email_from || 'alert-retha@cysceuci.com',
            'System Alert'
        );

        // Crear destinatarios
        const to = recipients.map(email =>
            this.createRecipient(email)
        );

        // Crear contenido HTML de la alerta
        const html = `
      <html>
        <body>
          <h2>System Alert</h2>
          <p><strong>Message:</strong> ${message}</p>
          ${Object.entries(additionalDetails).map(([key, value]) =>
            `<p><strong>${key}:</strong> ${value}</p>`
        ).join('')}
          <p>Timestamp: ${new Date().toISOString()}</p>
        </body>
      </html>
    `;

        // Enviar correo
        return this.sendEmail({
            from,
            to,
            subject,
            html,
            text: message
        });
    }
}

// Exportar la clase para su uso
module.exports = EmailService;

// Ejemplo de envío de correo básico
// async function enviarCorreo() {
//     try {
//         const from = emailService.createSender('alert-rethat@cysceuci.com', 'Mario');
//         const to = [
//             emailService.createRecipient('maacuellarma@gmail.com', 'Mario Cuellar')
//         ];

//         await emailService.sendEmail({
//             from,
//             to,
//             subject: 'Prueba de Correo',
//             html: '<strong>Contenido del correo</strong>',
//             text: 'Contenido en texto plano'
//         });
//     } catch (error) {
//         console.error('Error al enviar correo:', error);
//     }
// }


// Ejemplo de envío de alerta
// async function enviarAlerta() {
//     try {
//         await emailService.sendAlertEmail({
//             subject: 'Sistema de Alerta Crítica',
//             message: 'Se detectó una actividad sospechosa',
//             recipients: ['maacuellarma@gmail.com'],
//             additionalDetails: {
//                 'IP': '192.168.1.100',
//                 'Timestamp': new Date().toISOString()
//             }
//         });
//     } catch (error) {
//         console.error('Error al enviar alerta:', error);
//     }
// }




// const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend")

// const mailerSend = new MailerSend({
//     apiKey: process.env.MAILERSEND_api_key
// });

// const sentFrom = new Sender("alert-rethat@cysceuci.com", "Mario");

// const recipients = [
//     new Recipient("maacuellarma@gmail.com", "Mario Cuellar")
// ];

// const emailParams = new EmailParams()
//     .setFrom(sentFrom)
//     .setTo(recipients)
//     .setReplyTo(sentFrom)
//     .setSubject("This is a Subject")
//     .setHtml("<strong>This is the HTML content</strong>")
//     .setText("This is the text content");

//     await mailerSend.email.send(emailParams)

// // ( async function aux(){
// //         console.log("Send mail...")
// //         try{
// //                 await mailerSend.email.send(emailParams);
// //         }catch(err){
// //                 console.log("Error::",err)
// //         }
// //         console.log("Sended mail")
// // })()

// module.exports = AlertSystem;