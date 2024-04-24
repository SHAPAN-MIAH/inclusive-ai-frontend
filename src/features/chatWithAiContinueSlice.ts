// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatWithAiVideoAnalysisContinue {
  videoAnalysisContinue: string
}

interface ChatWithAiVideoAnalysisContinueState {
  ChatWithAiAnalysisContinue: ChatWithAiVideoAnalysisContinue | null;
}

const initialState: ChatWithAiVideoAnalysisContinueState = {
  ChatWithAiAnalysisContinue: null,
};

const chatWithAiVideoAnalysisContinueSlice: any = createSlice({
  name: "chatWithAiVideoAnalysisContinue",
  initialState,
  reducers: {
    setChatWithAiVideoAnalysis(state, action: PayloadAction<ChatWithAiVideoAnalysisContinue>) {
      state.ChatWithAiAnalysisContinue = action.payload;

    },

    clearChatWithAiAnalysisContinue(state) {
      state.ChatWithAiAnalysisContinue = null;
    },
  },
});

export const { setChatWithAiVideoAnalysis, clearChatWithAiAnalysisContinue} = chatWithAiVideoAnalysisContinueSlice.actions;
export default chatWithAiVideoAnalysisContinueSlice.reducer;
