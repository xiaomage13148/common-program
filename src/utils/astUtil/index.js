/**
 * JS AST语法解析器
 */
import {ruleTypeConstant} from '@/utils/astUtil/constant';
import {onlyEnglishAndNumberExistMethod} from '@/utils/astUtil/ruleTypeMethodUtil';

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
            const kind = statement.kind;
            // 对每个变量声明进行处理
            statement.declarations.forEach(declaration => {
                if (declaration.id.type === 'Identifier') {
                    // 获取变量名
                    const variableName = declaration.id.name;

                    // 修改变量名，这里可以根据你的需求进行修改逻辑
                    let modifiedVariableName = '';
                    if (ruleType === ruleTypeConstant.onlyEnglishAndNumberExist) {
                        modifiedVariableName = onlyEnglishAndNumberExistMethod(variableName, kind);
                    }

                    if (modifiedVariableName !== '') {
                        // 修改变量名
                        declaration.id.name = modifiedVariableName;
                    }
                }
            });
        }
    });
    const generateCode = escodegen.generate(parseCode);
    // TODO ---->打印generateCode , 日期: 2023/12/12
    console.log(`---->打印generateCode , 当前时间是: ${new Date().toString()}`, generateCode);
};


/**
 * 测试函数
 */
export const testFunction = () => {
    const inputString = 'Hello123 World456';

    const strings = inputString.split('');
    // TODO ---->打印strings , 日期: 2023/12/12
    console.log(`---->打印strings , 当前时间是: ${new Date().toString()}`, strings);


// 使用正则表达式匹配英文和数字
    const matches = inputString.match(/[a-zA-Z0-9]+/g);

// 输出匹配结果
//     console.log(matches);
    // TODO ---->打印matches , 日期: 2023/12/12
    console.log(`---->打印matches , 当前时间是: ${new Date().toString()}`, matches);

};