import type { QuizQuestion } from "@/components/interactive-quiz"

export const transformationalVsTransactionalQuiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which leadership style focuses primarily on maintaining the status quo through rewards and punishments?",
    options: [
      { id: "a", text: "Transformational Leadership", isCorrect: false },
      { id: "b", text: "Transactional Leadership", isCorrect: true },
      { id: "c", text: "Servant Leadership", isCorrect: false },
      { id: "d", text: "Situational Leadership", isCorrect: false },
    ],
    explanation:
      "Transactional leadership is characterized by its focus on maintaining the status quo through a system of rewards for good performance and punishments for poor performance. It emphasizes order, structure, and compliance with established rules.",
    points: 10,
  },
  {
    id: "q2",
    question:
      "A leader who inspires followers to exceed their own self-interests for the good of the organization is practicing:",
    options: [
      { id: "a", text: "Transformational Leadership", isCorrect: true },
      { id: "b", text: "Transactional Leadership", isCorrect: false },
      { id: "c", text: "Autocratic Leadership", isCorrect: false },
      { id: "d", text: "Laissez-faire Leadership", isCorrect: false },
    ],
    explanation:
      "Transformational leadership inspires followers to exceed their own self-interests and expectations. These leaders are charismatic and motivate their team to work toward a shared vision, often resulting in higher levels of performance and satisfaction.",
    points: 10,
  },
  {
    id: "q3",
    question: "Which of the following is NOT a characteristic of transformational leadership?",
    options: [
      { id: "a", text: "Intellectual stimulation", isCorrect: false },
      { id: "b", text: "Individualized consideration", isCorrect: false },
      { id: "c", text: "Contingent reward", isCorrect: true },
      { id: "d", text: "Inspirational motivation", isCorrect: false },
    ],
    explanation:
      "Contingent reward is a characteristic of transactional leadership, where rewards are given for meeting expectations. Transformational leadership is characterized by intellectual stimulation, individualized consideration, inspirational motivation, and idealized influence.",
    points: 15,
  },
  {
    id: "q4",
    question: "True or False: Transformational leaders focus primarily on short-term goals and immediate results.",
    options: [
      { id: "a", text: "True", isCorrect: false },
      { id: "b", text: "False", isCorrect: true },
    ],
    explanation:
      "False. Transformational leaders typically focus on long-term vision and goals. They inspire followers to look beyond immediate results and work toward broader organizational transformation and improvement.",
    points: 10,
  },
  {
    id: "q5",
    question: "Which leadership style is more effective during times of stability and routine operations?",
    options: [
      { id: "a", text: "Transformational Leadership", isCorrect: false },
      { id: "b", text: "Transactional Leadership", isCorrect: true },
      { id: "c", text: "Both are equally effective", isCorrect: false },
      { id: "d", text: "Neither is effective", isCorrect: false },
    ],
    explanation:
      "Transactional leadership is generally more effective during times of stability and routine operations. Its focus on structure, clear expectations, and established procedures works well when maintaining the status quo is the primary goal.",
    points: 10,
  },
]

export const servantSituationalQuiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is the primary focus of servant leadership?",
    options: [
      { id: "a", text: "Achieving organizational goals", isCorrect: false },
      { id: "b", text: "Maintaining control and authority", isCorrect: false },
      { id: "c", text: "Serving the needs of team members", isCorrect: true },
      { id: "d", text: "Adapting to different situations", isCorrect: false },
    ],
    explanation:
      "Servant leadership focuses primarily on serving the needs of team members. The servant leader prioritizes the growth, well-being, and development of their followers above their own interests or organizational goals.",
    points: 10,
  },
  {
    id: "q2",
    question:
      "In the Situational Leadership model, which leadership style would be most appropriate for a highly competent but somewhat insecure team member?",
    options: [
      {
        id: "q2-a",
        text: "S1 - Directing (high directive, low supportive)",
        isCorrect: false,
      },
      {
        id: "q2-b",
        text: "S2 - Coaching (high directive, high supportive)",
        isCorrect: false,
      },
      {
        id: "q2-c",
        text: "S3 - Supporting (low directive, high supportive)",
        isCorrect: true,
      },
      {
        id: "q2-d",
        text: "S4 - Delegating (low directive, low supportive)",
        isCorrect: false,
      },
    ],
    explanation:
      "The S3 (Supporting) style is most appropriate for team members who have high competence but variable commitment or confidence. This style provides low directive behavior (because they already know how to do the task) but high supportive behavior (to build their confidence and commitment). It focuses on listening, facilitating, and encouraging rather than telling them what to do.",
    points: 15,
  },
  {
    id: "q3",
    question:
      "Which of the following is NOT one of the key characteristics of servant leadership as described by Robert Greenleaf?",
    options: [
      {
        id: "q3-a",
        text: "Listening",
        isCorrect: false,
      },
      {
        id: "q3-b",
        text: "Empathy",
        isCorrect: false,
      },
      {
        id: "q3-c",
        text: "Authority",
        isCorrect: true,
      },
      {
        id: "q3-d",
        text: "Commitment to the growth of people",
        isCorrect: false,
      },
    ],
    explanation:
      "Authority and control are not key characteristics of servant leadership. In fact, servant leadership de-emphasizes authority in favor of influence, persuasion, and service. The key characteristics include listening, empathy, healing, awareness, persuasion, conceptualization, foresight, stewardship, commitment to the growth of people, and building community.",
    points: 10,
  },
  {
    id: "q4",
    question:
      "According to Situational Leadership theory, what are the two factors that determine a follower's development level?",
    options: [
      {
        id: "q4-a",
        text: "Intelligence and personality",
        isCorrect: false,
      },
      {
        id: "q4-b",
        text: "Experience and education",
        isCorrect: false,
      },
      {
        id: "q4-c",
        text: "Competence and commitment",
        isCorrect: true,
      },
      {
        id: "q4-d",
        text: "Age and seniority",
        isCorrect: false,
      },
    ],
    explanation:
      "In Situational Leadership theory, a follower's development level is determined by their competence (ability, knowledge, and skills) and commitment (confidence, motivation, and interest). These two factors combine to create four development levels, each requiring a different leadership approach.",
    points: 10,
  },
  {
    id: "q5",
    question:
      "Which former CEO is often cited as an example of servant leadership for creating a culture where employee happiness was prioritized?",
    options: [
      {
        id: "q5-a",
        text: "Steve Jobs (Apple)",
        isCorrect: false,
      },
      {
        id: "q5-b",
        text: "Jack Welch (GE)",
        isCorrect: false,
      },
      {
        id: "q5-c",
        text: "Tony Hsieh (Zappos)",
        isCorrect: true,
      },
      {
        id: "q5-d",
        text: "Larry Page (Google)",
        isCorrect: false,
      },
    ],
    explanation:
      "Tony Hsieh, the former CEO of Zappos, exemplified servant leadership by creating a culture where employee happiness and growth were prioritized. He famously offered new employees $2,000 to quit if they weren't happy, demonstrating his commitment to ensuring people were in the right roles for their well-being. Zappos became known for its exceptional customer service, which Hsieh believed stemmed from happy employees.",
    points: 10,
  },
  {
    id: "q6",
    question: "In Situational Leadership, which style involves high directive and high supportive behavior?",
    options: [
      {
        id: "q6-a",
        text: "S1 - Directing",
        isCorrect: false,
      },
      {
        id: "q6-b",
        text: "S2 - Coaching",
        isCorrect: true,
      },
      {
        id: "q6-c",
        text: "S3 - Supporting",
        isCorrect: false,
      },
      {
        id: "q6-d",
        text: "S4 - Delegating",
        isCorrect: false,
      },
    ],
    explanation:
      "S2 (Coaching) involves both high directive and high supportive behavior. This style is appropriate for followers with some competence but low commitment (D2). The leader still provides clear direction and close supervision but also explains decisions, solicits suggestions, and supports progress. It's like a coach who gives instructions but also encourages and supports the player.",
    points: 10,
  },
  {
    id: "q7",
    question:
      "True or False: Servant leadership and situational leadership are mutually exclusive approaches that cannot be combined.",
    options: [
      {
        id: "q7-a",
        text: "True",
        isCorrect: false,
      },
      {
        id: "q7-b",
        text: "False",
        isCorrect: true,
      },
    ],
    explanation:
      "Servant leadership and situational leadership can be complementary approaches. A leader can maintain the servant mindset of prioritizing others' growth and well-being while adapting their specific behaviors to match the situation and follower readiness. The servant leader's goal of developing followers aligns well with situational leadership's emphasis on helping followers progress to higher development levels.",
    points: 10,
  },
  {
    id: "q8",
    question:
      "Which of the following scenarios would be most appropriate for using the S1 (Directing) style in situational leadership?",
    options: [
      {
        id: "q8-a",
        text: "A team of experienced researchers working on a complex project",
        isCorrect: false,
      },
      {
        id: "q8-b",
        text: "A new employee learning a complex procedure for the first time",
        isCorrect: true,
      },
      {
        id: "q8-c",
        text: "A skilled team member who lacks confidence in a new role",
        isCorrect: false,
      },
      {
        id: "q8-d",
        text: "A highly competent and motivated employee taking on a familiar task",
        isCorrect: false,
      },
    ],
    explanation:
      "The S1 (Directing) style is most appropriate for followers at the D1 development level - those with low competence but high commitment. This often applies to new employees who are enthusiastic but lack the necessary skills or knowledge. They need clear direction, specific instructions, and close supervision to learn the task correctly.",
    points: 15,
  },
  {
    id: "q9",
    question: "Which of the following best describes how servant leadership views power and authority?",
    options: [
      {
        id: "q9-a",
        text: "Power should be concentrated with the leader to ensure clear direction",
        isCorrect: false,
      },
      {
        id: "q9-b",
        text: "Power is shared and used to serve others rather than to control them",
        isCorrect: true,
      },
      {
        id: "q9-c",
        text: "Power should be completely relinquished to create full autonomy",
        isCorrect: false,
      },
      {
        id: "q9-d",
        text: "Power should be used to reward compliance and punish non-compliance",
        isCorrect: false,
      },
    ],
    explanation:
      "Servant leadership views power as something to be shared and used in service of others, not as a means of control. Servant leaders use their position and influence to empower others, remove obstacles, and create conditions for growth and success. They lead through persuasion and example rather than coercion or positional authority.",
    points: 10,
  },
  {
    id: "q10",
    question: "What is the primary goal of situational leadership?",
    options: [
      {
        id: "q10-a",
        text: "To maximize employee satisfaction regardless of performance",
        isCorrect: false,
      },
      {
        id: "q10-b",
        text: "To maintain consistent leadership behavior across all situations",
        isCorrect: false,
      },
      {
        id: "q10-c",
        text: "To adapt leadership style to match follower development needs and task requirements",
        isCorrect: true,
      },
      {
        id: "q10-d",
        text: "To identify the one best leadership style for each organization",
        isCorrect: false,
      },
    ],
    explanation:
      "The primary goal of situational leadership is to adapt leadership style to match the development level of followers and the requirements of the task. This adaptive approach recognizes that different situations and different people require different leadership behaviors. The model aims to help leaders develop followers toward higher levels of competence and commitment over time.",
    points: 10,
  },
]

export const autocraticDemocraticQuiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "In which leadership style do leaders make decisions without consulting their team members?",
    options: [
      { id: "a", text: "Democratic Leadership", isCorrect: false },
      { id: "b", text: "Autocratic Leadership", isCorrect: true },
      { id: "c", text: "Laissez-faire Leadership", isCorrect: false },
      { id: "d", text: "Participative Leadership", isCorrect: false },
    ],
    explanation:
      "Autocratic leadership is characterized by individual control over all decisions with little input from team members. Autocratic leaders typically make choices based on their own ideas and judgments and rarely accept advice from followers.",
    points: 10,
  },
  {
    id: "q2",
    question:
      "Which leadership style is characterized by individual control over all decisions with little input from team members?",
    options: [
      {
        id: "q1-a",
        text: "Democratic leadership",
        isCorrect: false,
      },
      {
        id: "q1-b",
        text: "Laissez-faire leadership",
        isCorrect: false,
      },
      {
        id: "q1-c",
        text: "Autocratic leadership",
        isCorrect: true,
      },
      {
        id: "q1-d",
        text: "Servant leadership",
        isCorrect: false,
      },
    ],
    explanation:
      "Autocratic leadership is characterized by individual control over all decisions with little input from team members. The leader makes decisions independently with minimal or no consultation, dictates work methods and processes, and typically maintains strict control over team members.",
    points: 10,
  },
  {
    id: "q3",
    question: "In which situation would democratic leadership likely be most effective?",
    options: [
      {
        id: "q2-a",
        text: "A military unit during combat operations",
        isCorrect: false,
      },
      {
        id: "q2-b",
        text: "A creative team developing an innovative marketing campaign",
        isCorrect: true,
      },
      {
        id: "q2-c",
        text: "An emergency response team during a natural disaster",
        isCorrect: false,
      },
      {
        id: "q2-d",
        text: "A manufacturing line with strict safety protocols",
        isCorrect: false,
      },
    ],
    explanation:
      "Democratic leadership tends to be most effective in situations that require creativity, diverse perspectives, and team buy-in. A creative team developing a marketing campaign would benefit from the collaborative decision-making, open communication, and diverse input that democratic leadership encourages. This approach can lead to more innovative solutions and stronger team commitment to the final product.",
    points: 15,
  },
  {
    id: "q4",
    question: "Which of the following is a key characteristic of laissez-faire leadership?",
    options: [
      {
        id: "q3-a",
        text: "Close supervision of team members",
        isCorrect: false,
      },
      {
        id: "q3-b",
        text: "Centralized decision-making",
        isCorrect: false,
      },
      {
        id: "q3-c",
        text: "Minimal intervention and high autonomy for team members",
        isCorrect: true,
      },
      {
        id: "q3-d",
        text: "Collaborative decision-making processes",
        isCorrect: false,
      },
    ],
    explanation:
      "A key characteristic of laissez-faire leadership is minimal intervention and high autonomy for team members. This leadership style provides resources and support but largely stays out of the way, allowing the team to set goals, make decisions, and solve problems. It relies heavily on team members' expertise and self-motivation.",
    points: 10,
  },
  {
    id: "q5",
    question: "Which leadership style typically results in the fastest decision-making?",
    options: [
      {
        id: "q4-a",
        text: "Autocratic leadership",
        isCorrect: true,
      },
      {
        id: "q4-b",
        text: "Democratic leadership",
        isCorrect: false,
      },
      {
        id: "q4-c",
        text: "Laissez-faire leadership",
        isCorrect: false,
      },
      {
        id: "q4-d",
        text: "Servant leadership",
        isCorrect: false,
      },
    ],
    explanation:
      "Autocratic leadership typically results in the fastest decision-making because decisions are made by the leader alone without the need for consultation or consensus-building. While this can be advantageous in crisis situations requiring immediate action, it may come at the cost of team buy-in and the benefits of diverse perspectives.",
    points: 10,
  },
  {
    id: "q6",
    question: "Which of the following is a potential disadvantage of democratic leadership?",
    options: [
      {
        id: "q5-a",
        text: "It typically leads to poor-quality decisions",
        isCorrect: false,
      },
      {
        id: "q5-b",
        text: "It can result in slower decision-making processes",
        isCorrect: true,
      },
      {
        id: "q5-c",
        text: "It usually creates low team morale",
        isCorrect: false,
      },
      {
        id: "q5-d",
        text: "It discourages team member development",
        isCorrect: false,
      },
    ],
    explanation:
      "A potential disadvantage of democratic leadership is that it can result in slower decision-making processes. Consulting with team members, gathering diverse perspectives, and building consensus takes time. While this approach often leads to better-quality decisions and higher team commitment, it may not be suitable for situations requiring immediate action.",
    points: 10,
  },
  {
    id: "q7",
    question: "In which situation would laissez-faire leadership likely be most effective?",
    options: [
      {
        id: "q6-a",
        text: "A team of inexperienced interns requiring guidance",
        isCorrect: false,
      },
      {
        id: "q6-b",
        text: "A crisis situation requiring immediate decisions",
        isCorrect: false,
      },
      {
        id: "q6-c",
        text: "A team of highly skilled researchers working on an innovative project",
        isCorrect: true,
      },
      {
        id: "q6-d",
        text: "A manufacturing team with strict quality control requirements",
        isCorrect: false,
      },
    ],
    explanation:
      "Laissez-faire leadership is most effective with highly skilled, experienced, and self-motivated team members who require minimal supervision. A team of skilled researchers working on an innovative project would benefit from the autonomy and freedom this style provides, allowing them to explore creative approaches and leverage their expertise without unnecessary interference.",
    points: 15,
  },
  {
    id: "q8",
    question:
      "Which leadership style is characterized by shared decision-making authority and active solicitation of team input?",
    options: [
      {
        id: "q7-a",
        text: "Autocratic leadership",
        isCorrect: false,
      },
      {
        id: "q7-b",
        text: "Democratic leadership",
        isCorrect: true,
      },
      {
        id: "q7-c",
        text: "Laissez-faire leadership",
        isCorrect: false,
      },
      {
        id: "q7-d",
        text: "Transactional leadership",
        isCorrect: false,
      },
    ],
    explanation:
      "Democratic leadership (also called participative leadership) involves the leader sharing the decision-making authority with group members. While the leader maintains final responsibility, they actively seek input and collaboration from the team. This style encourages open communication, diverse perspectives, and team engagement.",
    points: 10,
  },
  {
    id: "q9",
    question:
      "True or False: Autocratic leadership is always ineffective and should be avoided in modern organizations.",
    options: [
      {
        id: "q8-a",
        text: "True",
        isCorrect: false,
      },
      {
        id: "q8-b",
        text: "False",
        isCorrect: true,
      },
    ],
    explanation:
      "False. While autocratic leadership has limitations and can negatively impact morale and creativity in many situations, it can be effective and appropriate in specific contexts. These include crisis situations requiring immediate decisions, environments where safety is paramount (military, emergency services), when working with inexperienced team members who need clear direction, and in highly regulated industries with strict compliance requirements.",
    points: 10,
  },
  {
    id: "q10",
    question: "Which of the following best describes the communication pattern in democratic leadership?",
    options: [
      {
        id: "q9-a",
        text: "One-way, top-down communication",
        isCorrect: false,
      },
      {
        id: "q9-b",
        text: "Two-way, open communication with active listening",
        isCorrect: true,
      },
      {
        id: "q9-c",
        text: "Minimal communication, primarily when requested",
        isCorrect: false,
      },
      {
        id: "q9-d",
        text: "Formal, structured communication through established channels",
        isCorrect: false,
      },
    ],
    explanation:
      "Democratic leadership is characterized by two-way, open communication with active listening. Leaders actively solicit input, encourage dialogue, and genuinely consider team members' ideas and concerns. This communication pattern helps build trust, ensures diverse perspectives are heard, and increases team engagement and commitment to decisions.",
    points: 10,
  },
  {
    id: "q11",
    question: "Which leadership style typically results in the highest level of team creativity and innovation?",
    options: [
      {
        id: "q10-a",
        text: "Autocratic leadership",
        isCorrect: false,
      },
      {
        id: "q10-b",
        text: "Democratic or laissez-faire leadership",
        isCorrect: true,
      },
      {
        id: "q10-c",
        text: "Bureaucratic leadership",
        isCorrect: false,
      },
      {
        id: "q10-d",
        text: "Transactional leadership",
        isCorrect: false,
      },
    ],
    explanation:
      "Democratic and laissez-faire leadership styles typically result in higher levels of creativity and innovation. Democratic leadership encourages diverse perspectives and collaborative problem-solving, while laissez-faire leadership provides the autonomy and freedom that creative work often requires. Both styles create environments where team members feel safe to express unconventional ideas and take calculated risks.",
    points: 10,
  },
]

export const matchingStylesQuiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which leadership style is most appropriate for a team of highly skilled and motivated professionals?",
    options: [
      { id: "a", text: "Autocratic Leadership", isCorrect: false },
      { id: "b", text: "Transactional Leadership", isCorrect: false },
      { id: "c", text: "Laissez-faire Leadership", isCorrect: true },
      { id: "d", text: "Directive Leadership", isCorrect: false },
    ],
    explanation:
      "Laissez-faire leadership is often most appropriate for teams of highly skilled and motivated professionals. These teams typically require minimal supervision and benefit from the autonomy to make their own decisions and solve problems independently.",
    points: 10,
  },
  {
    id: "q2",
    question:
      "Which of the following organizational situations would likely benefit most from transformational leadership?",
    options: [
      {
        id: "q1-a",
        text: "A stable organization with well-established processes",
        isCorrect: false,
      },
      {
        id: "q1-b",
        text: "An organization undergoing significant change or revitalization",
        isCorrect: true,
      },
      {
        id: "q1-c",
        text: "A team of experts working on routine tasks",
        isCorrect: false,
      },
      {
        id: "q1-d",
        text: "A crisis situation requiring immediate action",
        isCorrect: false,
      },
    ],
    explanation:
      "Transformational leadership is particularly effective during periods of significant organizational change or revitalization. This leadership style focuses on articulating a compelling vision, inspiring followers to exceed expectations, and challenging the status quo - all critical elements when an organization needs to transform itself. Transformational leaders help employees embrace change and find meaning in new directions.",
    points: 15,
  },
  {
    id: "q3",
    question: "Which leadership style would typically be most appropriate for a startup organization?",
    options: [
      {
        id: "q2-a",
        text: "Laissez-faire leadership",
        isCorrect: false,
      },
      {
        id: "q2-b",
        text: "Bureaucratic leadership",
        isCorrect: false,
      },
      {
        id: "q2-c",
        text: "Transformational leadership",
        isCorrect: true,
      },
      {
        id: "q2-d",
        text: "Purely transactional leadership",
        isCorrect: false,
      },
    ],
    explanation:
      "Startup organizations typically benefit most from transformational leadership. In the startup phase, organizations need a compelling vision, high levels of innovation, and the ability to inspire early employees to commit to an uncertain venture. Transformational leaders provide the vision, inspiration, and intellectual stimulation that startups need to establish themselves and navigate the challenges of early-stage growth.",
    points: 10,
  },
  {
    id: "q4",
    question: "Which organizational culture type would likely align best with servant leadership?",
    options: [
      {
        id: "q3-a",
        text: "Hierarchical culture focused on stability and control",
        isCorrect: false,
      },
      {
        id: "q3-b",
        text: "Market culture focused on competition and results",
        isCorrect: false,
      },
      {
        id: "q3-c",
        text: "Clan culture focused on collaboration and development",
        isCorrect: true,
      },
      {
        id: "q3-d",
        text: "Adhocracy culture focused on innovation and risk-taking",
        isCorrect: false,
      },
    ],
    explanation:
      "Servant leadership aligns best with clan cultures that emphasize collaboration, employee development, and a family-like atmosphere. Servant leadership's focus on serving others, building community, and fostering growth complements the clan culture's values of teamwork, participation, and human development. Both prioritize long-term human development and creating supportive environments.",
    points: 10,
  },
  {
    id: "q5",
    question:
      "When leading a team of highly skilled experts working on complex problems, which approach is typically most effective?",
    options: [
      {
        id: "q4-a",
        text: "Autocratic leadership with close supervision",
        isCorrect: false,
      },
      {
        id: "q4-b",
        text: "Democratic or laissez-faire leadership with high autonomy",
        isCorrect: true,
      },
      {
        id: "q4-c",
        text: "Purely transactional leadership focused on rewards",
        isCorrect: false,
      },
      {
        id: "q4-d",
        text: "Directive leadership with detailed instructions",
        isCorrect: false,
      },
    ],
    explanation:
      "Highly skilled experts working on complex problems typically perform best under democratic or laissez-faire leadership that provides high autonomy. These professionals have the expertise to make sound decisions and often need freedom to apply their specialized knowledge. Excessive direction or control can impede their creativity and problem-solving abilities. The leader's role becomes more about removing obstacles, providing resources, and facilitating collaboration.",
    points: 10,
  },
  {
    id: "q6",
    question:
      "Which leadership approach would be most appropriate during an organizational crisis requiring immediate action?",
    options: [
      {
        id: "q5-a",
        text: "Laissez-faire leadership",
        isCorrect: false,
      },
      {
        id: "q5-b",
        text: "Democratic leadership",
        isCorrect: false,
      },
      {
        id: "q5-c",
        text: "Autocratic leadership",
        isCorrect: true,
      },
      {
        id: "q5-d",
        text: "Servant leadership",
        isCorrect: false,
      },
    ],
    explanation:
      "During an organizational crisis requiring immediate action, autocratic leadership is typically most appropriate. Crisis situations demand quick, decisive action without the delays that can come with consultation or consensus-building. An autocratic approach provides clear direction, centralized control, and rapid decision-making when time is of the essence. Once the immediate crisis is resolved, leaders can shift to more participative approaches.",
    points: 10,
  },
  {
    id: "q7",
    question:
      "Which leadership style would best align with a mature organization focused on efficiency and standardized processes?",
    options: [
      {
        id: "q6-a",
        text: "Transformational leadership",
        isCorrect: false,
      },
      {
        id: "q6-b",
        text: "Transactional leadership",
        isCorrect: true,
      },
      {
        id: "q6-c",
        text: "Laissez-faire leadership",
        isCorrect: false,
      },
      {
        id: "q6-d",
        text: "Charismatic leadership",
        isCorrect: false,
      },
    ],
    explanation:
      "Transactional leadership typically aligns best with mature organizations focused on efficiency and standardized processes. This leadership style emphasizes clear expectations, established procedures, and consistent performance monitoring - all critical for maintaining operational excellence in stable environments. The structured reward systems and focus on compliance help ensure consistency and reliability in established processes.",
    points: 10,
  },
  {
    id: "q8",
    question:
      "True or False: The most effective leaders adapt their leadership style based on the specific needs of the situation, team, and organization.",
    options: [
      {
        id: "q7-a",
        text: "True",
        isCorrect: true,
      },
      {
        id: "q7-b",
        text: "False",
        isCorrect: false,
      },
    ],
    explanation:
      "True. The most effective leaders demonstrate flexibility in their leadership approach, adapting their style based on the specific needs of the situation, team, and organization. This adaptive approach recognizes that different contexts require different leadership behaviors. Rather than rigidly adhering to a single style, versatile leaders develop a repertoire of approaches and the judgment to know when to apply each one.",
    points: 10,
  },
  {
    id: "q9",
    question: "Which of the following team characteristics would suggest a need for more directive leadership?",
    options: [
      {
        id: "q8-a",
        text: "A team with high expertise and strong internal motivation",
        isCorrect: false,
      },
      {
        id: "q8-b",
        text: "A newly formed team with members who lack experience in their roles",
        isCorrect: true,
      },
      {
        id: "q8-c",
        text: "A cohesive team with a history of successful collaboration",
        isCorrect: false,
      },
      {
        id: "q8-d",
        text: "A team of creative professionals working on innovative projects",
        isCorrect: false,
      },
    ],
    explanation:
      "A newly formed team with members who lack experience in their roles typically requires more directive leadership. These team members need clear guidance, specific instructions, and closer supervision as they develop the necessary skills and understanding. More directive approaches like coaching or directing (from situational leadership) provide the structure and clarity that helps new team members build competence and confidence.",
    points: 15,
  },
  {
    id: "q9",
    question: "Which of the following best describes the concept of leadership style flexibility?",
    options: [
      {
        id: "q9-a",
        text: "Consistently applying the same leadership approach regardless of the situation",
        isCorrect: false,
      },
      {
        id: "q9-b",
        text: "Frequently changing leadership approaches without clear rationale",
        isCorrect: false,
      },
      {
        id: "q9-c",
        text: "Adapting leadership behavior based on situational assessment and follower needs",
        isCorrect: true,
      },
      {
        id: "q9-d",
        text: "Allowing team members to determine the leadership approach they prefer",
        isCorrect: false,
      },
    ],
    explanation:
      "Leadership style flexibility refers to adapting leadership behavior based on situational assessment and follower needs. It involves developing a repertoire of leadership approaches and the judgment to apply them appropriately. This flexibility requires situational awareness (accurately assessing contexts), emotional intelligence (understanding impact on others), and behavioral adaptability (changing approach based on what's needed).",
    points: 10,
  },
  {
    id: "q10",
    question:
      "Which of the following would be most important for a leader to develop in order to effectively match leadership styles to organizational needs?",
    options: [
      {
        id: "q10-a",
        text: "Technical expertise in the organization's industry",
        isCorrect: false,
      },
      {
        id: "q10-b",
        text: "Situational awareness and emotional intelligence",
        isCorrect: true,
      },
      {
        id: "q10-c",
        text: "Charismatic speaking abilities",
        isCorrect: false,
      },
      {
        id: "q10-d",
        text: "Extensive experience in a single leadership style",
        isCorrect: false,
      },
    ],
    explanation:
      "Situational awareness and emotional intelligence are most important for effectively matching leadership styles to organizational needs. Situational awareness allows leaders to accurately assess the demands of different contexts, while emotional intelligence helps them understand how different approaches impact team members. Together, these capabilities enable leaders to select appropriate styles and adapt their behavior based on what each situation requires.",
    points: 10,
  },
]
