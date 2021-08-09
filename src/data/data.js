export const QUESTIONS = [
  {
    id: 1,
    questionText: "Covid-19 xuất hiện lần đầu tiên ở nước nào ?",
    isMultiple: false,
    answerOptions: [
      { id: 1, isCorrect: false, answerText: "Viet Nam" },
      { id: 2, isCorrect: false, answerText: "USA" },
      { id: 3, isCorrect: true, answerText: "China" },
      { id: 4, isCorrect: false, answerText: "India" },
    ],
  },
  {
    id: 2,
    questionText: "Khẩu hiệu 5K là gì ? ?",
    isMultiple: false,
    answerOptions: [
      { id: 1, isCorrect: false, answerText: "Không đeo khẩu trang" },
      { id: 2, isCorrect: false, answerText: "Không tụ tập nơi đông người " },
      { id: 3, isCorrect: false, answerText: "Không ra đường" },
      {
        id: 4,
        isCorrect: true,
        answerText:
          "Khoảng cách - Khẩu trang - Khử khuẩn - Khai báo y tế - Khử khuẩn",
      },
    ],
  },
  {
    id: 3,
    isMultiple: false,
    questionText: "Thực hiện giãn cách xã hội tối thiểu trong bao nhiêu ngày ?",
    answerOptions: [
      { id: 1, isCorrect: false, answerText: "15 ngày" },
      { id: 2, isCorrect: true, answerText: "7 ngày" },
      { id: 3, isCorrect: false, answerText: "21 ngày" },
      { id: 4, isCorrect: false, answerText: "1 tháng" },
    ],
  },
  {
    id: 4,
    isMultiple: true,
    questionText:
      "Hiện tại tỉnh thành nào ở Việt Nam có số ca mắc nhiều nhất ?",
    answerOptions: [
      { id: 1, isCorrect: false, answerText: "Hà Nội" },
      { id: 2, isCorrect: true, answerText: "Hồ Chí Minh" },
      { id: 3, isCorrect: true, answerText: "Bắc Giang" },
      { id: 4, isCorrect: false, answerText: "Bắc Ninh " },
    ],
  },
];
