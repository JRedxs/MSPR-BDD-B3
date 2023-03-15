def takeLatinTupleGetUtf8List(theTuple):
    newList = []
    for n in range(len(theTuple)) :
        if isinstance(theTuple[n], str):
            newList.append(theTuple[n].encode('latin-1').decode('utf-8'))
        else:
            newList.append(theTuple[n])
    return newList