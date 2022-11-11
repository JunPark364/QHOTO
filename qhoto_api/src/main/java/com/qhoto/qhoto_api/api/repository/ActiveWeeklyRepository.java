package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.ActiveWeekly;
import com.qhoto.qhoto_api.domain.Quest;
import com.qhoto.qhoto_api.domain.type.QuestStatus;
import com.qhoto.qhoto_api.dto.response.QuestOptionItemRes;
import com.qhoto.qhoto_api.dto.response.QuestOptionRes;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface ActiveWeeklyRepository extends JpaRepository<ActiveWeekly, Long> {

    ActiveWeekly findWeeklyById(Long activeWeeklyId);

    List<ActiveWeekly> findTop3ByStatusOrderByDateDesc(QuestStatus questStatus);

    @Modifying
    @Query("update ActiveWeekly a set a.status = 'A' where a.date = :today ")
    int updateWeeklyQuestDtoA(@Param("today") LocalDate today);

    @Modifying
    @Query("update ActiveWeekly a set a.status = 'D' where a.date = :lastWeek")
    int updateWeeklyQuestAtoD(@Param("lastWeek") LocalDate lastWeek);

}
