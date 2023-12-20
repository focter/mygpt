import openai

openai.api_key = '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'

try:
    models = openai.Model.list()
    for model in models.data:
        print(model.id)
except Exception as e:
    print("发生错误:", e)
