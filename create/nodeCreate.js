import gulp from 'gulp'
import inquirer from 'inquirer'
import rename from 'gulp-rename'
import replace from 'gulp-replace'
import fs from 'fs'
import path from 'path';
import child_process from 'child_process'

const queryInfo = async () => {
    const answer2 = await inquirer.prompt([
        {
            type: 'input',
            name: 'componentName',
            message: 'please input component\'s name ?',
            validate(input) {
                return Boolean(input)
            }
        },
        {
            type: 'input',
            name: 'routePath',
            message: 'please input route path\'s desc ?',
            validate(input) {
                return Boolean(input)
            }
        }
    ])
    return Object.assign({}, answer2)
}



// 开始创建文件
const createFile = async info => new Promise((resolve, reject) => {
    let dest = path.resolve(`../src/pages/${info.componentName}`);
    child_process.execSync(`mkdir -p ${dest}`);
    const __dirname = path.resolve();
    gulp.src([
        `${__dirname}/template/**/*`
    ])
        .pipe(replace('{{name}}', info.componentName))
        .pipe(replace('{{className}}', cameltoLink(info.componentName)))
        .pipe(replace(path => {
            if (path.extname) {
                path.basename = info.componentName
            }
        }))
        .pipe(gulp.dest(dest))
        .on('end', () => {
            console.log('文件创建完毕，！！！！！》〉》〉》');
            resolve();
        })
})

const main = async () => {
    let moduleInfo = await queryInfo();
    await createFile(moduleInfo);
    await registNewRoute(moduleInfo)
    console.log('全部文件执行完毕！！！iiiii');
}
main().then()


// 工具类
// 大驼峰转链接符
const cameltoLink = name => {
    if (name.includes('_')) {
        return name.replace(/_/g, '-').toLocaleLowerCase()
    }
    let result = name[0].toLocaleLowerCase();
    for (let i = 1; i < name.length; i++) {
        if (name[i] !== name[i].toLocaleLowerCase()) {
            result += '-' + name[i].toLocaleLowerCase();
        } else {
            result += name[i];
        }
    }
    return result
}

const registNewRoute = async answer => {
    let routePath = `../src/router.tsx`;
    const routeTag = '// 这里添加新路由';
    const route = `
    <Route path="${answer.routePath}">
        <Route index element={<${answer.componentName} />} />
    </Route>
    ${routeTag}
    `;
    const requirePageTag = '// 这里引入新页面';
    const requirePage = `
    import ${answer.componentName} from './pages/${answer.componentName}';
    ${requirePageTag}
    `
    fs.writeFileSync(routePath, fs.readFileSync(routePath, 'utf-8').replace(routeTag, route).replace(requirePageTag, requirePage))
};
