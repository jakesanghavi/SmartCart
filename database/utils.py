# Get all sequential combinations of the string when space delimited (not including stop words or punctuation)
# Input: string
# Output: list of strings
def get_keywords(string):
    # Split the string into words
    stop_words = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"]
    punctuation = [".", ",", "!", "?", ";", ":", "'", '"', "(", ")", "[", "]", "{", "}", "<", ">", "/", "\\", "|", "@", "#", "$", "%", "^", "&", "*", "-", "_", "+", "=", "~", "`"]
    
    words = string.split()

    # Remove stop words and punctuation
    words = [word for word in words if word not in stop_words and word not in punctuation]
    # Get all sequential combinations of the words
    combinations = []
    for i in range(len(words)):
        for j in range(i, len(words)):
            combinations.append(" ".join(words[i:j+1]))
    return combinations 
    