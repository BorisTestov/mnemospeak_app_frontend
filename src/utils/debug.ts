interface TelegramMessageResponse {
    ok: boolean;
    result?: any;
    description?: string;
}

export const debugMessage = async (message: string): Promise<void> => {
    const isDebug = import.meta.env.VITE_DEBUG === 'true';
    const botToken = import.meta.env.VITE_BOT_TOKEN;
    const debugChatId = import.meta.env.VITE_DEBUG_CHAT_ID;

    if (!isDebug || !botToken || !debugChatId) {
        return;
    }

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: debugChatId,
                    text: `Debug message:\n${message}`,
                    parse_mode: 'HTML'
                })
            }
        );

        const data: TelegramMessageResponse = await response.json();
        if (!data.ok) {
            console.error('Failed to send debug message:', data.description);
        }
    } catch (error) {
        console.error('Error sending debug message:', error);
    }
};