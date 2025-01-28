package it.movie.movie_animation.entity;

import it.movie.movie_animation.entity.templates.AbsEntity;
import jakarta.persistence.*;
import lombok.*;


@EqualsAndHashCode(callSuper = true)
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Comment extends AbsEntity {


    @Column(nullable = false, length = 500)
    private String text; // Izoh matni

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie; // Izoh qilingan kino

    @ManyToOne
    @JoinTable(name = "user_id")
    private Users users; // bir qancha comentlar bir user tomonidan yozilgan
}
