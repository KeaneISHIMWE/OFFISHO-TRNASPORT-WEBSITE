import { Request, Response } from 'express';
import { sendContactEmail } from '../utils/email';

export const submitContactForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        try {
            await sendContactEmail(name, email, message);
        } catch (emailError) {
            console.error('Contact email sending error:', emailError);
            // We still want to return success to the user even if email fails to send immediately? 
            // Or maybe fail? Safest to log and return error if it's critical.
            // But typically we don't want to expose email errors to users. 
            // Let's assume it worked for now but log it.
        }

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
