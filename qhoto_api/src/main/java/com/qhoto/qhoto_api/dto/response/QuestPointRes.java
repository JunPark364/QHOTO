package com.qhoto.qhoto_api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class QuestPointRes {

    private int point;
    private int totalCnt;
    private int dailyCnt;
    private int weeklyCnt;
    private int monthlyCnt;

}
