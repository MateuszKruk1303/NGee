import nodemailer from 'nodemailer'

export default async (clientEmail: string, link: string, linkText: string) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'ngeeservice@gmail.com',
      pass: 'Lampa123!',
    },
  })
  let info = await transporter.sendMail({
    from: "'ngeeservice@gmail.com'",
    to: `${clientEmail}`,
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: `<a href="${link}">${linkText}</link>`,
  })
}
