const summarizeText = async (text) => {
    return text.split(" ").slice(0, 40).join(" ") + "...";
};

const extractTags = async (text) => {
    return text.split(" ").slice(0, 5);
};

module.exports = { summarizeText, extractTags };
