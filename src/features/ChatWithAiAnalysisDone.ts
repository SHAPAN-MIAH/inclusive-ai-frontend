// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatWithAiVideoAnalysisDone {
  videoAnalysisContinue: string
}

interface ChatWithAiVideoAnalysisDoneState {
  ChatWithAiAnalysisDone: ChatWithAiVideoAnalysisDone | null;
}

const initialState: ChatWithAiVideoAnalysisDoneState = {
  ChatWithAiAnalysisDone: null,
};

const chatWithAiVideoAnalysisDoneSlice: any = createSlice({
  name: "chatWithAiVideoAnalysisDone",
  initialState,
  reducers: {
    setChatWithAiVideoAnalysisDone(state, action: PayloadAction<ChatWithAiVideoAnalysisDone>) {
      state.ChatWithAiAnalysisDone = action.payload;

    },

    clearChatWithAiAnalysisDone(state) {
      state.ChatWithAiAnalysisDone = null;
    },
  },
});

export const { setChatWithAiVideoAnalysisDone, clearChatWithAiAnalysisDone} = chatWithAiVideoAnalysisDoneSlice.actions;
export default chatWithAiVideoAnalysisDoneSlice.reducer;
