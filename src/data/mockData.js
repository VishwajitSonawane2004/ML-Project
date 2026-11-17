// Realistic Demonstration Data for Reading Skills Profile Generation
// Clearly treated as demonstration data for college project evaluation

export const initialChildren = [
  {
    id: "CHD-101",
    name: "Aarav Sharma",
    age: 8,
    grade: "Grade 3",
    gender: "Male",
    school: "Lincoln Elementary School",
    dateAdded: "2026-09-12",
    status: "Assessed",
    avatarColor: "bg-blue-600",
    oralReadingSummary: {
      lastAssessed: "2026-11-04",
      wer: 8.5,
      estimatedWpm: 92,
      accuracyRate: 91.5
    },
    comprehensionSummary: {
      lastAssessed: "2026-11-10",
      totalAttempted: 14,
      accuracy: 78.5,
      reviewPending: 1
    }
  },
  {
    id: "CHD-102",
    name: "Maya Patel",
    age: 9,
    grade: "Grade 4",
    gender: "Female",
    school: "Oakridge Public School",
    dateAdded: "2026-09-15",
    status: "Assessed",
    avatarColor: "bg-emerald-600",
    oralReadingSummary: {
      lastAssessed: "2026-11-06",
      wer: 5.2,
      estimatedWpm: 114,
      accuracyRate: 94.8
    },
    comprehensionSummary: {
      lastAssessed: "2026-11-12",
      totalAttempted: 18,
      accuracy: 89.0,
      reviewPending: 0
    }
  },
  {
    id: "CHD-103",
    name: "Ethan Walker",
    age: 7,
    grade: "Grade 2",
    gender: "Male",
    school: "Lincoln Elementary School",
    dateAdded: "2026-09-20",
    status: "Assessed",
    avatarColor: "bg-purple-600",
    oralReadingSummary: {
      lastAssessed: "2026-11-01",
      wer: 14.8,
      estimatedWpm: 68,
      accuracyRate: 85.2
    },
    comprehensionSummary: {
      lastAssessed: "2026-11-08",
      totalAttempted: 10,
      accuracy: 70.0,
      reviewPending: 2
    }
  },
  {
    id: "CHD-104",
    name: "Sophia Rodriguez",
    age: 10,
    grade: "Grade 5",
    gender: "Female",
    school: "Westfield Academy",
    dateAdded: "2026-10-02",
    status: "Assessed",
    avatarColor: "bg-amber-600",
    oralReadingSummary: {
      lastAssessed: "2026-11-09",
      wer: 4.1,
      estimatedWpm: 128,
      accuracyRate: 95.9
    },
    comprehensionSummary: {
      lastAssessed: "2026-11-14",
      totalAttempted: 22,
      accuracy: 91.0,
      reviewPending: 0
    }
  },
  {
    id: "CHD-105",
    name: "Liam Chen",
    age: 8,
    grade: "Grade 3",
    gender: "Male",
    school: "Oakridge Public School",
    dateAdded: "2026-10-05",
    status: "Pending",
    avatarColor: "bg-indigo-600",
    oralReadingSummary: null,
    comprehensionSummary: {
      lastAssessed: "2026-11-03",
      totalAttempted: 6,
      accuracy: 66.7,
      reviewPending: 1
    }
  },
  {
    id: "CHD-106",
    name: "Ananya Iyer",
    age: 9,
    grade: "Grade 4",
    gender: "Female",
    school: "Lincoln Elementary School",
    dateAdded: "2026-10-10",
    status: "Assessed",
    avatarColor: "bg-pink-600",
    oralReadingSummary: {
      lastAssessed: "2026-11-08",
      wer: 6.8,
      estimatedWpm: 106,
      accuracyRate: 93.2
    },
    comprehensionSummary: {
      lastAssessed: "2026-11-11",
      totalAttempted: 15,
      accuracy: 84.0,
      reviewPending: 1
    }
  },
  {
    id: "CHD-107",
    name: "Lucas Miller",
    age: 7,
    grade: "Grade 2",
    gender: "Male",
    school: "Westfield Academy",
    dateAdded: "2026-10-18",
    status: "Pending",
    avatarColor: "bg-cyan-600",
    oralReadingSummary: {
      lastAssessed: "2026-11-13",
      wer: 18.2,
      estimatedWpm: 55,
      accuracyRate: 81.8
    },
    comprehensionSummary: null
  },
  {
    id: "CHD-108",
    name: "Zara Al-Mansoor",
    age: 10,
    grade: "Grade 5",
    gender: "Female",
    school: "Oakridge Public School",
    dateAdded: "2026-10-25",
    status: "Assessed",
    avatarColor: "bg-teal-600",
    oralReadingSummary: {
      lastAssessed: "2026-11-15",
      wer: 3.5,
      estimatedWpm: 135,
      accuracyRate: 96.5
    },
    comprehensionSummary: {
      lastAssessed: "2026-11-15",
      totalAttempted: 25,
      accuracy: 94.0,
      reviewPending: 0
    }
  }
];

export const initialQuestions = [
  {
    id: "SEB-001",
    code: "SEB_PS_101",
    sourceDataset: "SciEntsBank",
    datasetType: "Imported Dataset",
    domain: "Physical Science",
    topic: "States of Matter & Heat",
    gradeLevel: "Grade 4",
    totalStudentResponses: 142,
    prompt: "You put an ice cube on a plate in a warm room. After two hours, what happened to the ice cube, and why did this change occur?",
    sampleAnswers: [
      {
        answer: "The ice cube melted into liquid water because heat energy from the warm room transferred to the ice.",
        label: "Correct",
        confidence: 0.94
      },
      {
        answer: "The ice turned into water because it was left out too long in the room.",
        label: "Partially Correct",
        confidence: 0.78
      },
      {
        answer: "The ice disappeared into the air completely because it was magic.",
        label: "Incorrect",
        confidence: 0.96
      }
    ]
  },
  {
    id: "SEB-002",
    code: "SEB_ES_204",
    sourceDataset: "SciEntsBank",
    datasetType: "Imported Dataset",
    domain: "Earth Science",
    topic: "Erosion and Landforms",
    gradeLevel: "Grade 5",
    totalStudentResponses: 118,
    prompt: "How can flowing river water change the shape of rocks and canyons over many years?",
    sampleAnswers: [
      {
        answer: "Flowing water carries small particles that scrape against the rock and slowly wear it down over time, carving canyons.",
        label: "Correct",
        confidence: 0.91
      },
      {
        answer: "The water pushes the rocks and makes them smooth.",
        label: "Partially Correct",
        confidence: 0.82
      },
      {
        answer: "Rocks dissolve in cold river water like sugar in tea.",
        label: "Incorrect",
        confidence: 0.95
      }
    ]
  },
  {
    id: "SEB-003",
    code: "SEB_LS_308",
    sourceDataset: "SciEntsBank",
    datasetType: "Imported Dataset",
    domain: "Life Science",
    topic: "Plant Photosynthesis",
    gradeLevel: "Grade 3-4",
    totalStudentResponses: 156,
    prompt: "Why do green plants need sunlight to survive, and what part of the plant absorbs sunlight?",
    sampleAnswers: [
      {
        answer: "Plants need sunlight to make their own food through photosynthesis, and the leaves absorb sunlight using chlorophyll.",
        label: "Correct",
        confidence: 0.93
      },
      {
        answer: "Sunlight warms the plants and leaves catch the light so they stay alive.",
        label: "Partially Correct",
        confidence: 0.74
      },
      {
        answer: "Sunlight gives plants water through their flowers.",
        label: "Incorrect",
        confidence: 0.97
      }
    ]
  },
  {
    id: "BTL-001",
    code: "BEE_CIR_012",
    sourceDataset: "Beetle",
    datasetType: "Imported Dataset",
    domain: "Electrical Circuits",
    topic: "Closed vs Open Circuits",
    gradeLevel: "Grade 4-5",
    totalStudentResponses: 210,
    prompt: "Explain why a light bulb will NOT turn on if there is a gap or break in one of the wires connecting it to the battery.",
    sampleAnswers: [
      {
        answer: "The circuit is broken or open, preventing an uninterrupted conductive path for electrical current to flow from the battery through the bulb.",
        label: "Correct",
        confidence: 0.95
      },
      {
        answer: "Electricity cannot jump across the gap in the wire so the bulb gets no power.",
        label: "Partially Correct",
        confidence: 0.81
      },
      {
        answer: "The battery dies immediately when a wire is broken.",
        label: "Incorrect",
        confidence: 0.94
      }
    ]
  },
  {
    id: "BTL-002",
    code: "BEE_CIR_045",
    sourceDataset: "Beetle",
    datasetType: "Imported Dataset",
    domain: "Electrical Circuits",
    topic: "Switches and Conductors",
    gradeLevel: "Grade 4",
    totalStudentResponses: 174,
    prompt: "What is the function of a switch in an electrical circuit, and what happens when the switch is opened?",
    sampleAnswers: [
      {
        answer: "A switch opens or closes the circuit to control current; opening the switch breaks the connection and stops electric current.",
        label: "Correct",
        confidence: 0.92
      },
      {
        answer: "A switch turns the power on and off by disconnecting the wires.",
        label: "Partially Correct",
        confidence: 0.85
      },
      {
        answer: "The switch produces electricity for the bulb.",
        label: "Incorrect",
        confidence: 0.98
      }
    ]
  },
  {
    id: "TCQ-001",
    code: "TC_RC_001",
    sourceDataset: "Teacher Created",
    datasetType: "Teacher Created",
    domain: "Reading Comprehension",
    topic: "Main Idea & Supporting Details",
    gradeLevel: "Grade 3",
    totalStudentResponses: 24,
    prompt: "In the story 'The Brave Little Turtle', why did Toby choose to leave the safety of the pond, and how did he show courage?",
    sampleAnswers: [
      {
        answer: "Toby left the pond to warn his friends about the rising floodwaters and crawled through heavy mud despite being scared.",
        label: "Correct",
        confidence: 0.89
      },
      {
        answer: "He went outside to help other animals even though it was dangerous.",
        label: "Partially Correct",
        confidence: 0.77
      },
      {
        answer: "He was hungry and wanted fresh leaves in another forest.",
        label: "Incorrect",
        confidence: 0.91
      }
    ]
  }
];

export const sampleReadingPassages = [
  {
    id: "PSG-G2-01",
    title: "The Friendly Forest Squirrel",
    gradeLevel: "Grade 2",
    wordCount: 52,
    difficulty: "Easy",
    text: "Sammy was a little gray squirrel with a fluffy tail. Every morning, he hopped from branch to branch looking for crunchy acorns. One sunny afternoon, Sammy found a shiny red acorn under a tall oak tree. He decided to bury it near his favorite mossy rock for the cold winter ahead.",
    audioDurationSec: 36,
    defaultTranscript: "Sammy was a little gray squirrel with a fluffy tail. Every morning, he hopped from branch to branch looking for crunchy acorns. One sunny afternoon, Sammy found a shiny red acorn under a tall oak tree. He decided to bury it near his favorite mossy rock for the cold winter ahead."
  },
  {
    id: "PSG-G3-02",
    title: "The Journey of a Water Drop",
    gradeLevel: "Grade 3",
    wordCount: 84,
    difficulty: "Medium",
    text: "A tiny drop of water named Pip rested on a green lily pad. As the warm morning sun climbed higher into the sky, Pip began to evaporate into invisible water vapor. High up in the atmosphere, chilly breezes gathered millions of vapor drops together to form a fluffy white cloud. Soon, the cloud turned dark and heavy. Pip transformed into gentle rain and fell softly back to the sparkling lake.",
    audioDurationSec: 54,
    defaultTranscript: "A tiny drop of water named Pip rested on a green lily pad. As the warm morning sun climbed higher into the sky, Pip began to evaporate into invisible water vapor. High up in the atmosphere, chilly breezes gathered millions of vapor drops together to form a fluffy white cloud. Soon, the cloud turned dark and heavy. Pip transformed into gentle rain and fell softly back to the sparkling lake."
  },
  {
    id: "PSG-G4-03",
    title: "Explorers of the Solar System",
    gradeLevel: "Grade 4",
    wordCount: 112,
    difficulty: "Challenging",
    text: "For centuries, astronomers gazed up at the night sky, curious about the glowing planets orbiting our sun. Robotic rovers now traverse the rusty red valleys of Mars, analyzing ancient dust and searching for evidence of prehistoric water. Telescopes stationed in deep space capture dazzling photographs of Saturn's icy rings and Jupiter's colossal swirling storms. Each new discovery deepens our understanding of planetary science and inspires the next generation of engineers, mathematicians, and space pioneers.",
    audioDurationSec: 72,
    defaultTranscript: "For centuries, astronomers gazed up at the night sky, curious about the glowing planets orbiting our sun. Robotic rovers now traverse the rusty red valleys of Mars, analyzing ancient dust and searching for evidence of prehistoric water. Telescopes stationed in deep space capture dazzling photographs of Saturn's icy rings and Jupiter's colossal swirling storms. Each new discovery deepens our understanding of planetary science and inspires the next generation of engineers, mathematicians, and space pioneers."
  }
];

export const initialAssessments = [
  {
    id: "ASM-2026-089",
    childId: "CHD-101",
    childName: "Aarav Sharma",
    grade: "Grade 3",
    type: "Oral Reading",
    date: "2026-11-04 10:30 AM",
    passageTitle: "The Journey of a Water Drop",
    metric1: "8.5% WER",
    metric2: "92 Est. WPM",
    status: "Completed",
    confidence: "94%",
    reviewRequired: false,
    summary: "Strong phonological decoding with occasional hesitation on multisyllabic terms."
  },
  {
    id: "ASM-2026-088",
    childId: "CHD-102",
    childName: "Maya Patel",
    grade: "Grade 4",
    type: "Q&A Assessment",
    date: "2026-11-06 02:15 PM",
    questionCode: "SEB_PS_101",
    metric1: "Classification: Correct",
    metric2: "Confidence: 0.92",
    status: "Completed",
    confidence: "92%",
    reviewRequired: false,
    summary: "Demonstrated accurate understanding of heat transfer and physical phase transition."
  },
  {
    id: "ASM-2026-087",
    childId: "CHD-103",
    childName: "Ethan Walker",
    grade: "Grade 2",
    type: "Oral Reading",
    date: "2026-11-01 11:00 AM",
    passageTitle: "The Friendly Forest Squirrel",
    metric1: "14.8% WER",
    metric2: "68 Est. WPM",
    status: "Completed",
    confidence: "88%",
    reviewRequired: false,
    summary: "Repeated substitutions on sight words; steady prosody on simpler sentences."
  },
  {
    id: "ASM-2026-086",
    childId: "CHD-105",
    childName: "Liam Chen",
    grade: "Grade 3",
    type: "Q&A Assessment",
    date: "2026-11-03 09:45 AM",
    questionCode: "BEE_CIR_012",
    metric1: "Classification: Partial",
    metric2: "Confidence: 0.68",
    status: "Review Required",
    confidence: "68%",
    reviewRequired: true,
    summary: "Mentioned disconnected wires but omitted reference to continuous circuit loop; flagged for teacher review."
  },
  {
    id: "ASM-2026-085",
    childId: "CHD-104",
    childName: "Sophia Rodriguez",
    grade: "Grade 5",
    type: "Oral Reading",
    date: "2026-11-09 01:20 PM",
    passageTitle: "Explorers of the Solar System",
    metric1: "4.1% WER",
    metric2: "128 Est. WPM",
    status: "Completed",
    confidence: "97%",
    reviewRequired: false,
    summary: "Fluent phrasing and advanced expression; minor vowel omission on 'prehistoric'."
  },
  {
    id: "ASM-2026-084",
    childId: "CHD-106",
    childName: "Ananya Iyer",
    grade: "Grade 4",
    type: "Q&A Assessment",
    date: "2026-11-11 11:30 AM",
    questionCode: "SEB_ES_204",
    metric1: "Classification: Correct",
    metric2: "Confidence: 0.91",
    status: "Completed",
    confidence: "91%",
    reviewRequired: false,
    summary: "Accurately described mechanical sediment abrasion and long-term geological timeframes."
  },
  {
    id: "ASM-2026-083",
    childId: "CHD-107",
    childName: "Lucas Miller",
    grade: "Grade 2",
    type: "Oral Reading",
    date: "2026-11-13 10:15 AM",
    passageTitle: "The Friendly Forest Squirrel",
    metric1: "18.2% WER",
    metric2: "55 Est. WPM",
    status: "Completed",
    confidence: "82%",
    reviewRequired: false,
    summary: "Slow pace, phoneme blending difficulties on initial consonant clusters."
  },
  {
    id: "ASM-2026-082",
    childId: "CHD-108",
    childName: "Zara Al-Mansoor",
    grade: "Grade 5",
    type: "Oral Reading",
    date: "2026-11-15 03:00 PM",
    passageTitle: "Explorers of the Solar System",
    metric1: "3.5% WER",
    metric2: "135 Est. WPM",
    status: "Completed",
    confidence: "98%",
    reviewRequired: false,
    summary: "Exceptional reading fluency, clear enunciation, and natural intonation."
  }
];

export const dashboardMonthlyActivity = [
  { month: "Jun", oralAssessments: 12, qaAssessments: 16, total: 28 },
  { month: "Jul", oralAssessments: 18, qaAssessments: 22, total: 40 },
  { month: "Aug", oralAssessments: 25, qaAssessments: 34, total: 59 },
  { month: "Sep", oralAssessments: 42, qaAssessments: 55, total: 97 },
  { month: "Oct", oralAssessments: 56, qaAssessments: 68, total: 124 },
  { month: "Nov", oralAssessments: 64, qaAssessments: 81, total: 145 }
];

export const oralFluencyDistribution = [
  { grade: "Grade 2", averageWpm: 62, targetWpm: 75, avgWer: 16.5 },
  { grade: "Grade 3", averageWpm: 88, targetWpm: 95, avgWer: 9.8 },
  { grade: "Grade 4", averageWpm: 110, targetWpm: 115, avgWer: 6.2 },
  { grade: "Grade 5", averageWpm: 132, targetWpm: 130, avgWer: 4.4 }
];

export const qaComprehensionDistribution = [
  { name: "Correct", value: 68, color: "#10b981" },
  { name: "Partially Correct", value: 22, color: "#f59e0b" },
  { name: "Incorrect", value: 10, color: "#ef4444" }
];
