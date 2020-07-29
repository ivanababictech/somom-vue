export const getIndividualQuestions = (questions, involvements, individual) => {
    let allQuestions = {};
    _.each(questions, section => {
        _.each(section.data.questions, question => {
            if (question.is_standard) {
                if (! allQuestions.hasOwnProperty(section.section))
                    allQuestions[section.section] = [];

                allQuestions[section.section].push({
                    id: section.id,
                    question
                });
            } else {
                const involvement = _.find(involvements, involvement => involvement.name === individual.name);
                if (question.involvements.some(i => _.includes(involvement.involvements, i))) {
                    if (! allQuestions.hasOwnProperty(section.section))
                        allQuestions[section.section] = [];
                    allQuestions[section.section].push({
                        id: section.id,
                        question
                    });
                }
            }
        });
    });

    return allQuestions;
};

export const getCompanyQuestions = (questions, involvements) => {
    let allQuestions = {};
    _.each(questions, section => {
        _.each(section.data.questions, question => {
            if (involvements.sub_type === section.type) {
                if (question.is_standard) {
                    if (! allQuestions.hasOwnProperty(section.section))
                        allQuestions[section.section] = [];
                    allQuestions[section.section].push({
                        id: section.id,
                        question
                    });
                } else {
                    if (question.involvements.some(i => _.includes(involvements.involvements, i))) {
                        if (! allQuestions.hasOwnProperty(section.section))
                            allQuestions[section.section] = [];
                        allQuestions[section.section].push({
                            id: section.id,
                            question
                        });
                    }
                }
            }
        });
    });

    return allQuestions;
};

export const getInvolmentByName = (involvements, name) => {
    return  _.find(involvements, involvement => involvement.name === name);
};