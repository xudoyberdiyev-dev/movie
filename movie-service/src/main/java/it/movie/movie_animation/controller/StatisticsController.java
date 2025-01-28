package it.movie.movie_animation.controller;

import it.movie.movie_animation.entity.Statistics;
import it.movie.movie_animation.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/statistic")
@RequiredArgsConstructor
@CrossOrigin
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping
    public Statistics getStatistics() {
        long usersCount = statisticsService.getAuthCount();
        long moviesCount = statisticsService.getMovieCount();
        return new Statistics(usersCount, moviesCount);
    }
}
