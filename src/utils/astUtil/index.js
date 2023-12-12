/**
 * JS AST语法解析器
 */
const esprima = require('esprima');

const escodegen = require('escodegen');

/**
 * 按照指定的规则重命名变量命名
 * @param jsCode 需要修改的代码
 * @param ruleType 修改变量命名的规则集
 */
export const renameCodeVariable = (jsCode, ruleType) => {
    // 解析 JavaScript 代码
    const parseCode = esprima.parseScript(jsCode, {range: true});

    // 遍历 AST（抽象语法树）
    parseCode.body.forEach(statement => {
        if (statement.type === 'VariableDeclaration') {
            // 对每个变量声明进行处理
            statement.declarations.forEach(declaration => {
                if (declaration.id.type === 'Identifier') {
                    // 获取变量名
                    const variableName = declaration.id.name;

                    // 修改变量名，这里可以根据你的需求进行修改逻辑
                    const modifiedVariableName = 'new_' + variableName;

                    // 在这里输出修改后的变量名
                    console.log(`Original: ${variableName}, Modified: ${modifiedVariableName}`);

                    // 修改变量名的范围，这是可选的，如果需要改变源代码中的变量名，你可能需要这个范围信息
                    declaration.id.range[0] = 0;
                    declaration.id.range[1] = modifiedVariableName.length;

                    // 修改变量名
                    declaration.id.name = modifiedVariableName;
                }
            });
        }
    });

    // // TODO ---->打印parseCode , 日期: 2023/12/12
    // console.log(`---->打印parseCode , 当前时间是: ${new Date().toString()}`, parseCode);

    const generateCode = escodegen.generate(parseCode);
    // TODO ---->打印generateCode , 日期: 2023/12/12
    console.log(`---->打印generateCode , 当前时间是: ${new Date().toString()}`, generateCode);
};