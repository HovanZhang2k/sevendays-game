import { RULES, ENDINGS, QUESTIONS, GAME_STATE } from './gameData.js';

class GameManager {
    constructor() {
        this.state = { 
            ...GAME_STATE,
            gameStarted: false  // 添加游戏开始状态
        };
        this.initializeGame();
    }

    initializeGame() {
        // 从localStorage加载游戏状态（如果存在）
        const savedState = localStorage.getItem('gameState');
        if (savedState) {
            this.state = JSON.parse(savedState);
        }
    }

    startGame() {
        this.state.gameStarted = true;
        this.state.currentDay = 1;
        this.state.currentQuestion = 0;  // 从0开始，对应第一个问题
        this.state.score = 0;
        this.state.cognition = 0;
        this.state.deathCount = 0;
        this.state.verifiedRules = [];
        this.state.collectedNumbers = [];
        this.state.history = [];
        this.saveGameState();
    }

    saveGameState() {
        localStorage.setItem('gameState', JSON.stringify(this.state));
    }

    getCurrentQuestion() {
        // 题目ID格式为 `${day}-${currentQuestion+1}`
        return QUESTIONS.find(q =>
            q.day === this.state.currentDay &&
            q.id === `${this.state.currentDay}-${this.state.currentQuestion + 1}`
        );
    }

    makeChoice(questionId, choiceId) {
        const question = this.getCurrentQuestion();
        if (!question) return null;
        const choice = question.options.find(opt => opt.id === choiceId);
        if (!choice) return null;

        let result = {
            score: choice.score || 0,
            cognition: choice.cognition || 0,
            isDeath: choice.isDeath || false,
            verifiedRules: []
        };

        // 动态结局/分数
        if (choice.dynamic) {
            const dynamicResult = choice.dynamic(this.state);
            result = { ...result, ...dynamicResult };
            if (dynamicResult.ending) {
                this.state.ending = dynamicResult.ending;
            }
        }

        // 更新分数和认知
        this.state.score += result.score;
        this.state.cognition += result.cognition;

        // 统计误信伪规则（R4, R6, R7）
        if (!this.state.falseRuleCount) this.state.falseRuleCount = 0;
        if (question.rules && !result.isDeath) {
            question.rules.forEach(ruleId => {
                if (['R4', 'R6', 'R7'].includes(ruleId)) {
                    this.state.falseRuleCount++;
                }
            });
        }

        // 规则验证（只统计真规则，且必须未死亡且分数为正或有认知加分）
        if (
            question.rules &&
            !result.isDeath &&
            ((result.score && result.score > 0) || (result.cognition && result.cognition > 0))
        ) {
            question.rules.forEach(ruleId => {
                if (!this.state.verifiedRules.includes(ruleId) && ['R1','R2','R3','R5'].includes(ruleId)) {
                    this.state.verifiedRules.push(ruleId);
                    result.verifiedRules.push(ruleId);
                }
            });
        }

        // 记录墓园献祭等特殊flag
        if (!this.state.specialFlags) this.state.specialFlags = {};
        if (question.id === '7-6' && choice.specialFlag) {
            this.state.specialFlags[choice.specialFlag] = true;
        }

        // 题目跳转逻辑
        if (result.isDeath) {
            // 死亡直接跳到下一天第一题
            this.state.deathCount++;
            this.state.currentDay++;
            this.state.currentQuestion = 0;
        } else {
            // 正常推进
            this.state.currentQuestion++;
            // 每天8题，做完自动进入下一天
            if (this.state.currentQuestion >= 8) {
                this.state.currentDay++;
                this.state.currentQuestion = 0;
            }
        }

        // 保存游戏状态
        this.saveGameState();

        return result;
    }

    getEnding() {
        const { score, cognition, deathCount, verifiedRules, specialFlags, falseRuleCount } = this.state;

        // 真实之泪（分数+状态）
        if (
            score >= 600 && score <= 700 &&
            verifiedRules.includes('R1') &&
            verifiedRules.includes('R2') &&
            verifiedRules.includes('R3') &&
            verifiedRules.includes('R5') &&
            cognition >= 80 &&
            specialFlags && specialFlags.cemeterySacrifice
        ) {
            return ENDINGS.TRUE_TEARS;
        }

        // 镜面人生（分数+状态）
        if (
            score >= 400 && score <= 599 &&
            (deathCount >= 3 || (falseRuleCount && falseRuleCount >= 2))
        ) {
            return ENDINGS.MIRROR_LIFE;
        }

        // 机械黎明（分数+状态）
        if (
            score >= 200 && score <= 399 &&
            cognition >= 60 &&
            specialFlags && specialFlags.cemeteryAI
        ) {
            return ENDINGS.MECHANICAL_DAWN;
        }

        // 甜蜜囚徒（分数+状态）
        if (
            score >= 0 && score <= 199 &&
            (cognition < 60 || verifiedRules.filter(r => ['R1','R2','R3','R5'].includes(r)).length <= 1)
        ) {
            return ENDINGS.SWEET_PRISONER;
        }

        // 如果所有条件都不满足，给出最弱结局
        return ENDINGS.SWEET_PRISONER;
    }

    resetGame() {
        this.state = { ...GAME_STATE };
        localStorage.removeItem('gameState');
    }

    // 获取当前游戏状态
    getGameState() {
        return {
            ...this.state,
            currentQuestion: this.state.gameStarted ? this.getCurrentQuestion() : null,
            ending: this.state.gameStarted ? this.getEnding() : null
        };
    }
}

// 导出游戏管理器
export const gameManager = new GameManager(); 