/** שאלות אינטראקטיביות */

export const INTERACTIVE_QUESTIONS = [
  {
    "id": "q-int-pizza-half",
    "topic_id": "g2-fractions-half",
    "difficulty": 1,
    "type": "fractionPizza",
    "question_text": "צבעו **חצי** מהפיצה — כמה פרוסות?",
    "payload": {
      "slices": 4,
      "correctFilled": 2
    },
    "correctAnswer": "2/4",
    "explanation": "חצי מ-4 פרוסות הוא 2 פרוסות ($\\frac{2}{4}=\\frac{1}{2}$)."
  },
  {
    "id": "q-int-pizza-quarter",
    "topic_id": "g2-fractions-half",
    "difficulty": 1,
    "type": "fractionPizza",
    "question_text": "צבעו **רבע** מהעיגול.",
    "payload": {
      "slices": 4,
      "correctFilled": 1
    },
    "correctAnswer": "1/4",
    "explanation": "רבע מ-4 פרוסות הוא פרוסה אחת."
  },
  {
    "id": "q-int-line-15",
    "topic_id": "g4-decimals-intro",
    "difficulty": 2,
    "type": "numberLine",
    "question_text": "סמנו על הציר את המספר $1.5$",
    "payload": {
      "min": 0,
      "max": 3,
      "step": 0.5,
      "target": 1.5,
      "tolerance": 0.01
    },
    "correctAnswer": 1.5,
    "explanation": "$1.5$ נמצא באמצע בין $1$ ל-$2$."
  },
  {
    "id": "q-int-line-7",
    "topic_id": "g1-number-line",
    "difficulty": 1,
    "type": "numberLine",
    "question_text": "סמנו את המספר $7$ על ציר המספרים.",
    "payload": {
      "min": 0,
      "max": 10,
      "step": 1,
      "target": 7,
      "tolerance": 0.01
    },
    "correctAnswer": 7,
    "explanation": "סופרים מ-0 עד 7."
  },
  {
    "id": "q-int-drag-mul",
    "topic_id": "g2-mul-div-intro",
    "difficulty": 2,
    "type": "dragMatch",
    "question_text": "גררו כל תרגיל לתוצאה הנכונה.",
    "payload": {
      "mode": "match",
      "items": [
        {
          "id": "a",
          "label": "$5\\times 6$"
        },
        {
          "id": "b",
          "label": "$3\\times 4$"
        },
        {
          "id": "c",
          "label": "$2\\times 7$"
        }
      ],
      "bins": [
        {
          "id": "30",
          "label": "$30$"
        },
        {
          "id": "12",
          "label": "$12$"
        },
        {
          "id": "14",
          "label": "$14$"
        }
      ],
      "solution": {
        "a": "30",
        "b": "12",
        "c": "14"
      }
    },
    "correctAnswer": true,
    "explanation": "$5\\times 6=30$, $3\\times 4=12$, $2\\times 7=14$."
  },
  {
    "id": "q-int-drag-even",
    "topic_id": "g2-even-odd",
    "difficulty": 1,
    "type": "dragMatch",
    "question_text": "מיינו: זוגיים ואי-זוגיים.",
    "payload": {
      "mode": "sort",
      "items": [
        {
          "id": "n2",
          "label": "$2$"
        },
        {
          "id": "n5",
          "label": "$5$"
        },
        {
          "id": "n8",
          "label": "$8$"
        },
        {
          "id": "n9",
          "label": "$9$"
        }
      ],
      "bins": [
        {
          "id": "even",
          "label": "זוגיים"
        },
        {
          "id": "odd",
          "label": "אי-זוגיים"
        }
      ],
      "solution": {
        "n2": "even",
        "n5": "odd",
        "n8": "even",
        "n9": "odd"
      }
    },
    "correctAnswer": true,
    "explanation": "זוגי מתחלק ב-2 בלי שארית: 2 ו-8. אי-זוגי: 5 ו-9."
  },
  {
    "id": "q-int-unit-frac",
    "topic_id": "g3-fractions-unit",
    "difficulty": 2,
    "type": "fractionPizza",
    "question_text": "צבעו שליש מהעיגול ($\\frac{1}{3}$).",
    "payload": {
      "slices": 6,
      "correctFilled": 2
    },
    "correctAnswer": "2/6",
    "explanation": "$\\frac{1}{3}=\\frac{2}{6}$ — שתי פרוסות מתוך שש."
  }
]
export function getInteractiveQuestionsForTopic(topicId) {
  return INTERACTIVE_QUESTIONS.filter((q) => q.topic_id === topicId);
}
