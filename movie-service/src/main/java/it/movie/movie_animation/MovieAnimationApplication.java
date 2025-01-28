package it.movie.movie_animation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling //bu vaqt blan ishlaganda kerak boladigan anotatsiya
public class MovieAnimationApplication {
    public static void main(String[] args) {
        SpringApplication.run(MovieAnimationApplication.class, args);
    }

}
