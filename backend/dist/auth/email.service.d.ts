export declare class EmailService {
    private transporter;
    sendResetLink(email: string, resetLink: string): Promise<void>;
}
