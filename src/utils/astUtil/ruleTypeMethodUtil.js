/**
 * 规则类型
 */

/**
 * 转换成对应的规则
 * 英文小驼峰开头，并且只能存在英文和数字
 * $00sjs_00whey00
 * @param variableName 需要转换的变量名称
 * @param kind 变量的类型
 */
export const onlyEnglishAndNumberExistMethod = (variableName, kind) => {
    const variableCharArray = variableName.split('');
    // 转换的变量
    let convertedVariable = '';
    // 最小单元组-字符
    let minUnitCharArray = [];
    // 最小单元组-数字
    let minUnitNumberArray = [];
    // 使用正则表达式匹配英文字符
    const charRegex = /^[a-zA-Z]$/;
    // 使用正则表达式匹配数字
    const numberRegex = /^[0-9]$/;

    // FIXME 存在问题，待修改
    let minUnitCharArrayResetNumber = 0;

    for (let i = 0; i < variableCharArray.length; i++) {
        if (charRegex.test(variableCharArray[i])) {
            minUnitCharArray.push(variableCharArray[i]);
        } else if (numberRegex.test(variableCharArray[i])) {
            minUnitNumberArray.push(variableCharArray[i]);
        } else {
            if (minUnitCharArray.length > 0) {
                if (minUnitCharArrayResetNumber > 0) {
                    minUnitCharArray[0] = minUnitCharArray[0].toUpperCase();
                }
                convertedVariable += minUnitCharArray.join('');

                if (minUnitNumberArray.length > 0) {
                    convertedVariable += minUnitNumberArray.join('');
                }
            }
            minUnitCharArray = [];
            minUnitCharArrayResetNumber++;
            minUnitNumberArray = [];
        }
    }
    // 在结束时检查是否还有存留
    if (minUnitCharArray.length > 0) {
        if (minUnitCharArrayResetNumber > 0) {
            minUnitCharArray[0] = minUnitCharArray[0].toUpperCase();
        }
        convertedVariable += minUnitCharArray.join('');

        if (minUnitNumberArray.length > 0) {
            convertedVariable += minUnitNumberArray.join('');
        }
    }

    if (convertedVariable !== '') {
        let suffix = '';
        let splitKind = kind.split('');
        if (splitKind.length > 0) {
            splitKind[0] = splitKind[0].toUpperCase();
            suffix = splitKind.join('');
        }
        return convertedVariable + suffix;
    } else {
        return 'newVar' + Math.random().toString(36).substr(2, 6);
    }
};