//package it.movie.movie_animation.bot;
//
//import org.hibernate.sql.Update;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//import org.telegram.telegrambots.api.methods.send.SendMessage;
//import org.telegram.telegrambots.bots.TelegramLongPollingBot;
//import org.telegram.telegrambots.exceptions.TelegramApiException;
//
//@Component
//public class TelegramBotService extends TelegramLongPollingBot {
//    @Value("${telegram.bot.token}")
//    private String botToken;
//
//    @Value("${telegram.bot.username}")
//    private String botUsername;
//
//    @Value("${telegram.channel.id}")
//    private String channelId;
//
//
//    @Override
//    public void onUpdateReceived(org.telegram.telegrambots.api.objects.Update update) {
//        if (update.hasMessage() && update.getMessage().hasText()) {
//            Integer userId = update.getMessage().getFrom().getId();
//            String chatId = update.getMessage().getChatId().toString();
//
//            if (update.getMessage().getText().equals("/start")) {
//                if (isUserSubscribed(userId)) {
//                    sendMessage(chatId, "✅ Siz kanalga a'zo bo‘lgansiz! Endi botdan foydalanishingiz mumkin.");
//                } else {
//                    sendMessage(chatId, "🚀 Botdan foydalanish uchun kanalga a'zo bo‘ling!\n\n👉 " + channelId);
//                }
//            }
//        }
//    }
//
//    @Override
//    public String getBotUsername() {
//        return botUsername;
//    }
//
//    @Override
//    public String getBotToken() {
//        return botToken;
//    }
//
//    private final RestTemplate restTemplate = new RestTemplate();
//
//
//    private boolean isUserSubscribed(Integer userId) {
//        String url = String.format("https://api.telegram.org/bot%s/getChatMember?chat_id=%s&user_id=%d", botToken, channelId, userId);
//        try {
//            return restTemplate.getForObject(url, String.class).contains("\"status\":\"member\"");
//        } catch (Exception e) {
//            return false;
//        }
//    }
//
//    private void sendMessage(String chatId, String text) {
//        SendMessage message = new SendMessage();
//        message.setChatId(chatId);
//        message.setText(text);
//        try {
//            execute(message);
//        } catch (TelegramApiException e) {
//            e.printStackTrace();
//        }
//    }
//}
