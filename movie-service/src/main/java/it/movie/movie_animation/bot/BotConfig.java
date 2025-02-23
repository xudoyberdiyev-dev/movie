//package it.movie.movie_animation.bot;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.stereotype.Service;
//import org.telegram.telegrambots.TelegramBotsApi;
//import org.telegram.telegrambots.exceptions.TelegramApiException;
//import org.telegram.telegrambots.generics.LongPollingBot;
//
//@Service
//public class BotConfig {
//    public BotConfig(LongPollingBot bot) {
//        TelegramBotsApi botsApi = new TelegramBotsApi();
//        try {
//            botsApi.registerBot(bot);
//        } catch (TelegramApiException e) {
//            e.printStackTrace();
//        }
//    }
//}
