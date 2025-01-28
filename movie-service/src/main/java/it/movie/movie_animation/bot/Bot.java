//package it.movie.movie_animation.bot;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.ArrayList;
//import java.util.List;
//
//
//public class Bot extends TelegramLongPollingBot {
//    @Override
//    public String getBotUsername() {
//        return BotConfig.BOT_USERNAME;
//    }
//
//    @Override
//    public String getBotToken() {
//        return BotConfig.BOT_TOKEN;
//    }
//
//    @Override
//    public void onUpdateReceived(Update update) {
//        if (update.hasMessage() && update.getMessage().hasText()) {
//            String messageText = update.getMessage().getText();
//            String chatId = update.getMessage().getChatId().toString();
//            String userId = update.getMessage().getFrom().getId().toString();
//
//            if ("/start".equals(messageText)) {
//                sendStartMessage(chatId);
//            }else{
//                if (isUserMemberOfChannel(userId)) {
//                    sendMessage(chatId, "Xush kelibsiz! Endi botdan foydalanishingiz mumkin.");
//                } else {
//                    sendMessage(chatId, "Iltimos, avval kanalga a'zo bo'ling.");
//                }
//            }
//        }
//    }
//    public void sendMessage(String chatId, String text) {
//        SendMessage message = new SendMessage();
//        message.setChatId(chatId);
//        message.setText(text);
//
//        try {
//            execute(message);
//        } catch (TelegramApiException e) {
//            e.printStackTrace();
//        }}
//
//    public void sendStartMessage(String chatId) {
//        SendMessage message = new SendMessage();
//        message.setChatId(chatId);
//        message.setText("Botdan foydalanish uchun kanalga a'zo bo'ling:");
//
//        InlineKeyboardMarkup markupInline = new InlineKeyboardMarkup();
//        List<List<InlineKeyboardButton>> rowsInline = new ArrayList<>();
//        List<InlineKeyboardButton> rowInline = new ArrayList<>();
//
//        InlineKeyboardButton joinChannelButton = new InlineKeyboardButton();
//        joinChannelButton.setText("Kanalga a'zo bo'lish");
//        joinChannelButton.setUrl("https://t.me/Global_news_rasmiy");
//
//        rowInline.add(joinChannelButton);
//        rowsInline.add(rowInline);
//        markupInline.setKeyboard(rowsInline);
//
//        message.setReplyMarkup(markupInline);
//
//        try {
//            execute(message); // Sending the message
//        } catch (TelegramApiException e) {
//            e.printStackTrace();
//        }
//    }
//    public boolean isUserMemberOfChannel(String userId) {
//        String telegramApiUrl = "https://api.telegram.org/bot6626562489:AAG-hvP5mWJiH_gE4X6cxlwNcg5_2YAxZ5A/getChatMember?chat_id=@Global_news_rasmiy&user_id=" + userId;
//        RestTemplate restTemplate = new RestTemplate();
//
//            ResponseEntity<String> response = restTemplate.getForEntity(telegramApiUrl, String.class);
//
//        // Javobni tekshirish
//        return response.getBody().contains("\"status\":\"member\"");
//    }
//}
//
