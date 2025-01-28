package it.movie.movie_animation.entity;

import it.movie.movie_animation.entity.templates.AbsEntity;
import jakarta.persistence.*;
import jdk.jfr.Enabled;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Complaint extends AbsEntity {

    @Column(nullable = false, length = 500)
    private String message;

    private String userName;
    private String userSurname;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;

    private boolean isProcessed = false; // Admin tomonidan ishlangan yoki yo'q
}
